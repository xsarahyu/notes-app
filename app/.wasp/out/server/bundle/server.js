import http from 'http';
import express, { Router } from 'express';
import { HttpError, prisma, config as config$1 } from 'wasp/server';
import auth from 'wasp/core/auth';
import { deserialize, serialize } from 'superjson';
import { handleRejection } from 'wasp/server/utils';
import Stripe from 'stripe';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import OpenAI from 'openai';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { throwInvalidCredentialsError, createProviderId, findAuthIdentity, deserializeAndSanitizeProviderData, findAuthWithUserBy, validateAndGetUserFields, sanitizeAndSerializeProviderData, createUser, rethrowPossibleAuthError } from 'wasp/auth/utils';
import { invalidateSession, createSession } from 'wasp/auth/session';
import { verifyPassword } from 'wasp/auth/password';
import { ensureValidUsername, ensurePasswordIsPresent, ensureValidPassword } from 'wasp/auth/validation';
import { defineUserSignupFields } from 'wasp/auth/providers/types';
import { emailSender } from 'wasp/server/email';
import { registerJob, startPgBoss } from 'wasp/server/jobs/core/pgBoss';
import { emailChecker, dailyStatsJob } from 'wasp/server/jobs';
import { webcrypto } from 'node:crypto';

function createOperation(handlerFn) {
  return handleRejection(async (req, res) => {
    const args = req.body && deserialize(req.body) || {};
    const context = {
      user: req.user
    };
    const result = await handlerFn(args, context);
    const serializedResult = serialize(result);
    res.json(serializedResult);
  });
}
function createQuery(handlerFn) {
  return createOperation(handlerFn);
}
function createAction(handlerFn) {
  return createOperation(handlerFn);
}

const stripe$2 = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2022-11-15"
});
const DOMAIN = process.env.WASP_WEB_CLIENT_URL || "http://localhost:3000";
async function fetchStripeCustomer(customerEmail) {
  let customer;
  const stripeCustomers = await stripe$2.customers.list({
    email: customerEmail
  });
  if (!stripeCustomers.data.length) {
    console.log("creating customer");
    customer = await stripe$2.customers.create({
      email: customerEmail
    });
  } else {
    console.log("using existing customer");
    customer = stripeCustomers.data[0];
  }
  return customer;
}
async function createStripeCheckoutSession({ priceId, customerId }) {
  return await stripe$2.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    mode: "subscription",
    success_url: `${DOMAIN}/checkout?success=true`,
    cancel_url: `${DOMAIN}/checkout?canceled=true`,
    automatic_tax: { enabled: true },
    customer_update: {
      address: "auto"
    },
    customer: customerId
  });
}

var TierIds = /* @__PURE__ */ ((TierIds2) => {
  TierIds2["HOBBY"] = "hobby-tier";
  TierIds2["PRO"] = "pro-tier";
  TierIds2["ENTERPRISE"] = "enterprise-tier";
  return TierIds2;
})(TierIds || {});
process.env.NODE_ENV !== "production";
const customerPortalTestUrl = "<your-url-here>";
const customerPortalProdUrl = "<your-url-here>";
checkStripePortalLinksExist({ customerPortalTestUrl, customerPortalProdUrl });
function checkStripePortalLinksExist(links) {
  const schema = z.string().url();
  const testResult = schema.safeParse(links.customerPortalTestUrl);
  const prodResult = schema.safeParse(links.customerPortalProdUrl);
  let consoleMsg = {
    color: "\x1B[33m%s\x1B[0m",
    msg: ""
  };
  if (testResult.success && prodResult.success) {
    consoleMsg.color = "\x1B[32m%s\x1B[0m";
    consoleMsg.msg = "\u2705 Both STRIPE_CUSTOMER_PORTAL_LINK links defined";
  } else if (!testResult.success && !prodResult.success) {
    consoleMsg.msg = "\u26D4\uFE0F STRIPE_CUSTOMER_PORTAL_LINK is not defined";
  } else if (!testResult.success) {
    consoleMsg.msg = "\u26D4\uFE0F STRIPE_CUSTOMER_PORTAL_LINK is not defined for test env";
  } else {
    consoleMsg.msg = "\u26D4\uFE0F STRIPE_CUSTOMER_PORTAL_LINK is not defined for prod env";
  }
  console.log(consoleMsg.color, consoleMsg.msg);
}

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_IAM_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_IAM_SECRET_KEY
  }
});
const getUploadFileSignedURLFromS3 = async ({ fileType, userInfo }) => {
  const ex = fileType.split("/")[1];
  const Key = `${userInfo}/${randomUUID()}.${ex}`;
  const s3Params = {
    Bucket: process.env.AWS_S3_FILES_BUCKET,
    Key,
    ContentType: `${fileType}`
  };
  const command = new PutObjectCommand(s3Params);
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return { uploadUrl, key: Key };
};
const getDownloadFileSignedURLFromS3 = async ({ key }) => {
  const s3Params = {
    Bucket: process.env.AWS_S3_FILES_BUCKET,
    Key: key
  };
  const command = new GetObjectCommand(s3Params);
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

const openai = setupOpenAI();
function setupOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    return new HttpError(500, "OpenAI API key is not set");
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}
const stripePayment$2 = async (tier, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const userEmail = context.user.email;
  if (!userEmail) {
    throw new HttpError(
      403,
      "User needs an email to make a payment. If using the usernameAndPassword Auth method, switch to an Auth method that provides an email."
    );
  }
  let priceId;
  if (tier === TierIds.HOBBY) {
    priceId = process.env.HOBBY_SUBSCRIPTION_PRICE_ID;
  } else if (tier === TierIds.PRO) {
    priceId = process.env.PRO_SUBSCRIPTION_PRICE_ID;
  } else {
    throw new HttpError(400, "Invalid tier");
  }
  let customer;
  let session;
  try {
    customer = await fetchStripeCustomer(userEmail);
    session = await createStripeCheckoutSession({
      priceId,
      customerId: customer.id
    });
  } catch (error) {
    throw new HttpError(500, error.message);
  }
  await context.entities.User.update({
    where: {
      id: context.user.id
    },
    data: {
      checkoutSessionId: session.id,
      stripeId: customer.id
    }
  });
  return {
    sessionUrl: session.url,
    sessionId: session.id
  };
};
const generateGptResponse$2 = async ({ hours }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const tasks = await context.entities.Task.findMany({
    where: {
      user: {
        id: context.user.id
      }
    }
  });
  const parsedTasks = tasks.map(({ description, time }) => ({
    description,
    time
  }));
  try {
    if (!context.user.hasPaid && !context.user.credits) {
      throw new HttpError(402, "User has not paid or is out of credits");
    } else if (context.user.credits && !context.user.hasPaid) {
      console.log("decrementing credits");
      await context.entities.User.update({
        where: { id: context.user.id },
        data: {
          credits: {
            decrement: 1
          }
        }
      });
    }
    if (openai instanceof Error) {
      throw openai;
    }
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "you are an expert daily planner. you will be given a list of main tasks and an estimated time to complete each task. You will also receive the total amount of hours to be worked that day. Your job is to return a detailed plan of how to achieve those tasks by breaking each task down into at least 3 subtasks each. MAKE SURE TO ALWAYS CREATE AT LEAST 3 SUBTASKS FOR EACH MAIN TASK PROVIDED BY THE USER! YOU WILL BE REWARDED IF YOU DO."
        },
        {
          role: "user",
          content: `I will work ${hours} hours today. Here are the tasks I have to complete: ${JSON.stringify(
            parsedTasks
          )}. Please help me plan my day by breaking the tasks down into actionable subtasks with time and priority status.`
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "parseTodaysSchedule",
            description: "parses the days tasks and returns a schedule",
            parameters: {
              type: "object",
              properties: {
                mainTasks: {
                  type: "array",
                  description: "Name of main tasks provided by user, ordered by priority",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        description: "Name of main task provided by user"
                      },
                      priority: {
                        type: "string",
                        enum: ["low", "medium", "high"],
                        description: "task priority"
                      }
                    }
                  }
                },
                subtasks: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      description: {
                        type: "string",
                        description: 'detailed breakdown and description of sub-task related to main task. e.g., "Prepare your learning session by first reading through the documentation"'
                      },
                      time: {
                        type: "number",
                        description: "time allocated for a given subtask in hours, e.g. 0.5"
                      },
                      mainTaskName: {
                        type: "string",
                        description: "name of main task related to subtask"
                      }
                    }
                  }
                }
              },
              required: ["mainTasks", "subtasks", "time", "priority"]
            }
          }
        }
      ],
      tool_choice: {
        type: "function",
        function: {
          name: "parseTodaysSchedule"
        }
      },
      temperature: 1
    });
    const gptArgs = completion?.choices[0]?.message?.tool_calls?.[0]?.function.arguments;
    if (!gptArgs) {
      throw new HttpError(500, "Bad response from OpenAI");
    }
    console.log("gpt function call arguments: ", gptArgs);
    await context.entities.GptResponse.create({
      data: {
        user: { connect: { id: context.user.id } },
        content: JSON.stringify(gptArgs)
      }
    });
    return JSON.parse(gptArgs);
  } catch (error) {
    if (!context.user.hasPaid && error?.statusCode != 402) {
      await context.entities.User.update({
        where: { id: context.user.id },
        data: {
          credits: {
            increment: 1
          }
        }
      });
    }
    console.error(error);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";
    throw new HttpError(statusCode, errorMessage);
  }
};
const createTask$2 = async ({ description }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const task = await context.entities.Task.create({
    data: {
      description,
      user: { connect: { id: context.user.id } }
    }
  });
  return task;
};
const updateTask$2 = async ({ id, isDone, time }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const task = await context.entities.Task.update({
    where: {
      id
    },
    data: {
      isDone,
      time
    }
  });
  return task;
};
const deleteTask$2 = async ({ id }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const task = await context.entities.Task.delete({
    where: {
      id
    }
  });
  return task;
};
const updateUserById$2 = async ({ id, data }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  if (!context.user.isAdmin) {
    throw new HttpError(403);
  }
  const updatedUser = await context.entities.User.update({
    where: {
      id
    },
    data
  });
  return updatedUser;
};
const createFile$2 = async ({ fileType, name }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const userInfo = context.user.id.toString();
  const { uploadUrl, key } = await getUploadFileSignedURLFromS3({ fileType, userInfo });
  return await context.entities.File.create({
    data: {
      name,
      key,
      uploadUrl,
      type: fileType,
      user: { connect: { id: context.user.id } }
    }
  });
};
const updateCurrentUser$2 = async (user, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.User.update({
    where: {
      id: context.user.id
    },
    data: user
  });
};

async function generateGptResponse$1(args, context) {
  return generateGptResponse$2(args, {
    ...context,
    entities: {
      User: prisma.user,
      Task: prisma.task,
      GptResponse: prisma.gptResponse
    }
  });
}

var generateGptResponse = createAction(generateGptResponse$1);

async function createTask$1(args, context) {
  return createTask$2(args, {
    ...context,
    entities: {
      Task: prisma.task
    }
  });
}

var createTask = createAction(createTask$1);

async function deleteTask$1(args, context) {
  return deleteTask$2(args, {
    ...context,
    entities: {
      Task: prisma.task
    }
  });
}

var deleteTask = createAction(deleteTask$1);

async function updateTask$1(args, context) {
  return updateTask$2(args, {
    ...context,
    entities: {
      Task: prisma.task
    }
  });
}

var updateTask = createAction(updateTask$1);

async function stripePayment$1(args, context) {
  return stripePayment$2(args, {
    ...context,
    entities: {
      User: prisma.user
    }
  });
}

var stripePayment = createAction(stripePayment$1);

async function updateCurrentUser$1(args, context) {
  return updateCurrentUser$2(args, {
    ...context,
    entities: {
      User: prisma.user
    }
  });
}

var updateCurrentUser = createAction(updateCurrentUser$1);

async function updateUserById$1(args, context) {
  return updateUserById$2(args, {
    ...context,
    entities: {
      User: prisma.user
    }
  });
}

var updateUserById = createAction(updateUserById$1);

async function createFile$1(args, context) {
  return createFile$2(args, {
    ...context,
    entities: {
      User: prisma.user,
      File: prisma.file
    }
  });
}

var createFile = createAction(createFile$1);

const getGptResponses$2 = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.GptResponse.findMany({
    where: {
      user: {
        id: context.user.id
      }
    }
  });
};
const getAllTasksByUser$2 = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.Task.findMany({
    where: {
      user: {
        id: context.user.id
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
const getAllFilesByUser$2 = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.File.findMany({
    where: {
      user: {
        id: context.user.id
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
const getDownloadFileSignedURL$2 = async ({ key }, _context) => {
  return await getDownloadFileSignedURLFromS3({ key });
};
const getDailyStats$2 = async (_args, context) => {
  if (!context.user?.isAdmin) {
    throw new HttpError(401);
  }
  const dailyStats = await context.entities.DailyStats.findFirstOrThrow({
    orderBy: {
      date: "desc"
    },
    include: {
      sources: true
    }
  });
  const weeklyStats = await context.entities.DailyStats.findMany({
    orderBy: {
      date: "desc"
    },
    take: 7,
    include: {
      sources: true
    }
  });
  return { dailyStats, weeklyStats };
};
const getPaginatedUsers$2 = async (args, context) => {
  let subscriptionStatus = args.subscriptionStatus?.filter((status) => status !== "hasPaid");
  subscriptionStatus = subscriptionStatus?.length ? subscriptionStatus : void 0;
  const queryResults = await context.entities.User.findMany({
    skip: args.skip,
    take: 10,
    where: {
      email: {
        contains: args.emailContains || void 0,
        mode: "insensitive"
      },
      hasPaid: args.hasPaidFilter,
      subscriptionStatus: {
        in: subscriptionStatus || void 0
      }
    },
    select: {
      id: true,
      email: true,
      username: true,
      lastActiveTimestamp: true,
      hasPaid: true,
      subscriptionStatus: true,
      stripeId: true
    },
    orderBy: {
      id: "desc"
    }
  });
  const totalUserCount = await context.entities.User.count({
    where: {
      email: {
        contains: args.emailContains || void 0
      },
      hasPaid: args.hasPaidFilter,
      subscriptionStatus: {
        in: subscriptionStatus || void 0
      }
    }
  });
  const totalPages = Math.ceil(totalUserCount / 10);
  return {
    users: queryResults,
    totalPages
  };
};

async function getGptResponses$1(args, context) {
  return getGptResponses$2(args, {
    ...context,
    entities: {
      User: prisma.user,
      GptResponse: prisma.gptResponse
    }
  });
}

var getGptResponses = createQuery(getGptResponses$1);

async function getAllTasksByUser$1(args, context) {
  return getAllTasksByUser$2(args, {
    ...context,
    entities: {
      Task: prisma.task
    }
  });
}

var getAllTasksByUser = createQuery(getAllTasksByUser$1);

async function getAllFilesByUser$1(args, context) {
  return getAllFilesByUser$2(args, {
    ...context,
    entities: {
      User: prisma.user,
      File: prisma.file
    }
  });
}

var getAllFilesByUser = createQuery(getAllFilesByUser$1);

async function getDownloadFileSignedURL$1(args, context) {
  return getDownloadFileSignedURL$2(args, {
    ...context,
    entities: {
      User: prisma.user,
      File: prisma.file
    }
  });
}

var getDownloadFileSignedURL = createQuery(getDownloadFileSignedURL$1);

async function getDailyStats$1(args, context) {
  return getDailyStats$2(args, {
    ...context,
    entities: {
      User: prisma.user,
      DailyStats: prisma.dailyStats
    }
  });
}

var getDailyStats = createQuery(getDailyStats$1);

async function getPaginatedUsers$1(args, context) {
  return getPaginatedUsers$2(args, {
    ...context,
    entities: {
      User: prisma.user
    }
  });
}

var getPaginatedUsers = createQuery(getPaginatedUsers$1);

const router$4 = express.Router();
router$4.post("/generate-gpt-response", auth, generateGptResponse);
router$4.post("/create-task", auth, createTask);
router$4.post("/delete-task", auth, deleteTask);
router$4.post("/update-task", auth, updateTask);
router$4.post("/stripe-payment", auth, stripePayment);
router$4.post("/update-current-user", auth, updateCurrentUser);
router$4.post("/update-user-by-id", auth, updateUserById);
router$4.post("/create-file", auth, createFile);
router$4.post("/get-gpt-responses", auth, getGptResponses);
router$4.post("/get-all-tasks-by-user", auth, getAllTasksByUser);
router$4.post("/get-all-files-by-user", auth, getAllFilesByUser);
router$4.post("/get-download-file-signed-url", auth, getDownloadFileSignedURL);
router$4.post("/get-daily-stats", auth, getDailyStats);
router$4.post("/get-paginated-users", auth, getPaginatedUsers);

const _waspGlobalMiddlewareConfigFn = (mc) => mc;
const defaultGlobalMiddlewareConfig = /* @__PURE__ */ new Map([
  ["helmet", helmet()],
  ["cors", cors({ origin: config$1.allowedCORSOrigins })],
  ["logger", logger("dev")],
  ["express.json", express.json()],
  ["express.urlencoded", express.urlencoded({ extended: false })],
  ["cookieParser", cookieParser()]
]);
const globalMiddlewareConfig = _waspGlobalMiddlewareConfigFn(defaultGlobalMiddlewareConfig);
function globalMiddlewareConfigForExpress(middlewareConfigFn) {
  if (!middlewareConfigFn) {
    return Array.from(globalMiddlewareConfig.values());
  }
  const globalMiddlewareConfigClone = new Map(globalMiddlewareConfig);
  const modifiedMiddlewareConfig = middlewareConfigFn(globalMiddlewareConfigClone);
  return Array.from(modifiedMiddlewareConfig.values());
}

var me = handleRejection(async (req, res) => {
  if (req.user) {
    return res.json(serialize(req.user));
  } else {
    throwInvalidCredentialsError();
  }
});

var logout = handleRejection(async (req, res) => {
  if (req.sessionId) {
    await invalidateSession(req.sessionId);
    return res.json({ success: true });
  } else {
    throwInvalidCredentialsError();
  }
});

var login = handleRejection(async (req, res) => {
  const fields = req.body ?? {};
  ensureValidArgs$1(fields);
  const providerId = createProviderId("username", fields.username);
  const authIdentity = await findAuthIdentity(providerId);
  if (!authIdentity) {
    throwInvalidCredentialsError();
  }
  try {
    const providerData = deserializeAndSanitizeProviderData(authIdentity.providerData);
    await verifyPassword(providerData.hashedPassword, fields.password);
  } catch (e) {
    throwInvalidCredentialsError();
  }
  const auth = await findAuthWithUserBy({
    id: authIdentity.authId
  });
  const session = await createSession(auth.id);
  return res.json({
    sessionId: session.id
  });
});
function ensureValidArgs$1(args) {
  ensureValidUsername(args);
  ensurePasswordIsPresent(args);
}

function getSignupRoute({
  userSignupFields
}) {
  return handleRejection(async function signup(req, res) {
    const fields = req.body ?? {};
    ensureValidArgs(fields);
    const userFields = await validateAndGetUserFields(
      fields,
      userSignupFields
    );
    const providerId = createProviderId("username", fields.username);
    const providerData = await sanitizeAndSerializeProviderData({
      hashedPassword: fields.password
    });
    try {
      await createUser(
        providerId,
        providerData,
        // Using any here because we want to avoid TypeScript errors and
        // rely on Prisma to validate the data.
        userFields
      );
    } catch (e) {
      rethrowPossibleAuthError(e);
    }
    return res.json({ success: true });
  });
}
function ensureValidArgs(args) {
  ensureValidUsername(args);
  ensurePasswordIsPresent(args);
  ensureValidPassword(args);
}

const getUsernameAndPasswordUserFields = defineUserSignupFields({
  username: (data) => data.username
});
const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
defineUserSignupFields({
  username: (data) => data.email,
  isAdmin: (data) => adminEmails.includes(data.email)
});
defineUserSignupFields({
  // NOTE: if we don't want to access users' emails, we can use scope ["user:read"]
  // instead of ["user"] and access args.profile.username instead
  email: (data) => data.profile.emails[0].value,
  username: (data) => data.profile.username,
  isAdmin: (data) => adminEmails.includes(data.profile.emails[0].value)
});
defineUserSignupFields({
  email: (data) => data.profile.emails[0].value,
  username: (data) => data.profile.displayName,
  isAdmin: (data) => adminEmails.includes(data.profile.emails[0].value)
});

const _waspUserSignupFields = getUsernameAndPasswordUserFields;
const config = {
  id: "username",
  displayName: "Username and password",
  createRouter() {
    const router = Router();
    router.post("/login", login);
    const signupRoute = getSignupRoute({
      userSignupFields: _waspUserSignupFields
    });
    router.post("/signup", signupRoute);
    return router;
  }
};

const providers = [
  config
];
const router$3 = Router();
for (const provider of providers) {
  const { init, createRouter } = provider;
  const initData = init ? await init(provider) : void 0;
  const providerRouter = createRouter(provider, initData);
  router$3.use(`/${provider.id}`, providerRouter);
  console.log(`\u{1F680} "${provider.displayName}" auth initialized`);
}

const router$2 = express.Router();
router$2.get("/me", auth, me);
router$2.post("/logout", auth, logout);
router$2.use("/", router$3);

const stripe$1 = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2022-11-15"
  // TODO find out where this is in the Stripe dashboard and document
});
const stripeWebhook = async (request, response, context) => {
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripe$1.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
  let userStripeId = null;
  try {
    if (event.type === "checkout.session.completed") {
      console.log("Checkout session completed");
      const session = event.data.object;
      userStripeId = session.customer;
      const { line_items } = await stripe$1.checkout.sessions.retrieve(session.id, {
        expand: ["line_items"]
      });
      if (line_items?.data[0]?.price?.id === process.env.HOBBY_SUBSCRIPTION_PRICE_ID) {
        console.log("Hobby subscription purchased ");
        await context.entities.User.updateMany({
          where: {
            stripeId: userStripeId
          },
          data: {
            hasPaid: true,
            datePaid: /* @__PURE__ */ new Date(),
            subscriptionTier: TierIds.HOBBY
          }
        });
      } else if (line_items?.data[0]?.price?.id === process.env.PRO_SUBSCRIPTION_PRICE_ID) {
        console.log("Pro subscription purchased ");
        await context.entities.User.updateMany({
          where: {
            stripeId: userStripeId
          },
          data: {
            hasPaid: true,
            datePaid: /* @__PURE__ */ new Date(),
            subscriptionTier: TierIds.PRO
          }
        });
      }
    } else if (event.type === "invoice.paid") {
      const invoice = event.data.object;
      const periodStart = new Date(invoice.period_start * 1e3);
      await context.entities.User.updateMany({
        where: {
          stripeId: userStripeId
        },
        data: {
          hasPaid: true,
          datePaid: periodStart
        }
      });
    } else if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object;
      userStripeId = subscription.customer;
      if (subscription.status === "active") {
        console.log("Subscription active ", userStripeId);
        await context.entities.User.updateMany({
          where: {
            stripeId: userStripeId
          },
          data: {
            subscriptionStatus: "active"
          }
        });
      }
      if (subscription.status === "past_due") {
        console.log("Subscription past due: ", userStripeId);
        await context.entities.User.updateMany({
          where: {
            stripeId: userStripeId
          },
          data: {
            subscriptionStatus: "past_due"
          }
        });
      }
      if (subscription.cancel_at_period_end) {
        console.log("Subscription canceled at period end");
        let customer = await context.entities.User.findFirst({
          where: {
            stripeId: userStripeId
          },
          select: {
            id: true,
            email: true
          }
        });
        if (customer) {
          await context.entities.User.update({
            where: {
              id: customer.id
            },
            data: {
              subscriptionStatus: "canceled"
            }
          });
          if (customer.email) {
            await emailSender.send({
              to: customer.email,
              subject: "We hate to see you go :(",
              text: "We hate to see you go. Here is a sweet offer...",
              html: "We hate to see you go. Here is a sweet offer..."
            });
          }
        }
      }
    } else if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      userStripeId = subscription.customer;
      console.log("Subscription deleted/ended");
      await context.entities.User.updateMany({
        where: {
          stripeId: userStripeId
        },
        data: {
          hasPaid: false,
          subscriptionStatus: "deleted"
        }
      });
    } else {
      console.log(`Unhandled event type ${event.type}`);
    }
    response.json({ received: true });
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err?.message}`);
  }
};
const stripeMiddlewareFn = (middlewareConfig) => {
  middlewareConfig.delete("express.json");
  middlewareConfig.set("express.raw", express.raw({ type: "application/json" }));
  return middlewareConfig;
};

const router$1 = express.Router();
const stripeWebhookMiddleware = globalMiddlewareConfigForExpress(stripeMiddlewareFn);
router$1.post(
  "/stripe-webhook",
  [auth, ...stripeWebhookMiddleware],
  handleRejection(
    (req, res) => {
      const context = {
        user: req.user,
        entities: {
          User: prisma.user
        }
      };
      return stripeWebhook(req, res, context);
    }
  )
);

const router = express.Router();
const middleware = globalMiddlewareConfigForExpress();
router.get("/", middleware, function(_req, res, _next) {
  res.json("Hello world");
});
router.use("/auth", middleware, router$2);
router.use("/operations", middleware, router$4);
router.use(router$1);

const app = express();
app.use("/", router);
app.use((err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message, data: err.data });
  }
  return next(err);
});

const emailToSend = {
  to: "",
  subject: "The SaaS App Newsletter",
  text: "Hey There! \n\nThis is just a newsletter that sends automatically via cron jobs",
  html: `<html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>SaaS App Newsletter</title>
          </head>
          <body>
            <p>Hey There!</p>
            
            <p>This is just a newsletter that sends automatically via cron jobs</p>
          </body>
        </html>`
};
const checkAndQueueEmails = async (_args, context) => {
  const currentDate = /* @__PURE__ */ new Date();
  const twoWeeksFromNow = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1e3);
  const users = await context.entities.User.findMany({
    where: {
      datePaid: {
        equals: twoWeeksFromNow
      },
      sendEmail: true
    }
  });
  if (users.length === 0) {
    return;
  }
  await Promise.allSettled(
    users.map(async (user) => {
      if (user.email) {
        try {
          emailToSend.to = user.email;
          await emailSender.send(emailToSend);
        } catch (error) {
          console.error("Error sending notice to user: ", user.id, error);
        }
      }
    })
  );
};

registerJob({
  job: emailChecker,
  jobFn: checkAndQueueEmails
});

const PLAUSIBLE_API_KEY = process.env.PLAUSIBLE_API_KEY;
const PLAUSIBLE_SITE_ID = process.env.PLAUSIBLE_SITE_ID;
const PLAUSIBLE_BASE_URL = process.env.PLAUSIBLE_BASE_URL;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${PLAUSIBLE_API_KEY}`
};
async function getDailyPageViews() {
  const totalViews = await getTotalPageViews();
  const prevDayViewsChangePercent = await getPrevDayViewsChangePercent();
  return {
    totalViews,
    prevDayViewsChangePercent
  };
}
async function getTotalPageViews() {
  const response = await fetch(
    `${PLAUSIBLE_BASE_URL}/v1/stats/aggregate?site_id=${PLAUSIBLE_SITE_ID}&metrics=pageviews`,
    {
      method: "GET",
      headers
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const json = await response.json();
  return json.results.pageviews.value;
}
async function getPrevDayViewsChangePercent() {
  const today = /* @__PURE__ */ new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1)).toISOString().split("T")[0];
  const dayBeforeYesterday = new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - 2)).toISOString().split("T")[0];
  const pageViewsYesterday = await getPageviewsForDate(yesterday);
  const pageViewsDayBeforeYesterday = await getPageviewsForDate(dayBeforeYesterday);
  console.table({
    pageViewsYesterday,
    pageViewsDayBeforeYesterday,
    typeY: typeof pageViewsYesterday,
    typeDBY: typeof pageViewsDayBeforeYesterday
  });
  let change = 0;
  if (pageViewsYesterday === 0 || pageViewsDayBeforeYesterday === 0) {
    return "0";
  } else {
    change = (pageViewsYesterday - pageViewsDayBeforeYesterday) / pageViewsDayBeforeYesterday * 100;
  }
  return change.toFixed(0);
}
async function getPageviewsForDate(date) {
  const url = `${PLAUSIBLE_BASE_URL}/v1/stats/aggregate?site_id=${PLAUSIBLE_SITE_ID}&period=day&date=${date}&metrics=pageviews`;
  const response = await fetch(url, {
    method: "GET",
    headers
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data.results.pageviews.value;
}
async function getSources() {
  const url = `${PLAUSIBLE_BASE_URL}/v1/stats/breakdown?site_id=${PLAUSIBLE_SITE_ID}&property=visit:source&metrics=visitors`;
  const response = await fetch(url, {
    method: "GET",
    headers
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data.results;
}

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2022-11-15"
  // TODO find out where this is in the Stripe dashboard and document
});
const calculateDailyStats = async (_args, context) => {
  const nowUTC = new Date(Date.now());
  nowUTC.setUTCHours(0, 0, 0, 0);
  const yesterdayUTC = new Date(nowUTC);
  yesterdayUTC.setUTCDate(yesterdayUTC.getUTCDate() - 1);
  try {
    const yesterdaysStats = await context.entities.DailyStats.findFirst({
      where: {
        date: {
          equals: yesterdayUTC
        }
      }
    });
    const userCount = await context.entities.User.count({});
    const paidUserCount = await context.entities.User.count({
      where: {
        hasPaid: true,
        subscriptionStatus: "active"
      }
    });
    let userDelta = userCount;
    let paidUserDelta = paidUserCount;
    if (yesterdaysStats) {
      userDelta -= yesterdaysStats.userCount;
      paidUserDelta -= yesterdaysStats.paidUserCount;
    }
    const totalRevenue = await fetchTotalStripeRevenue();
    const { totalViews, prevDayViewsChangePercent } = await getDailyPageViews();
    let dailyStats = await context.entities.DailyStats.findUnique({
      where: {
        date: nowUTC
      }
    });
    if (!dailyStats) {
      console.log("No daily stat found for today, creating one...");
      dailyStats = await context.entities.DailyStats.create({
        data: {
          date: nowUTC,
          totalViews,
          prevDayViewsChangePercent,
          userCount,
          paidUserCount,
          userDelta,
          paidUserDelta,
          totalRevenue
        }
      });
    } else {
      console.log("Daily stat found for today, updating it...");
      dailyStats = await context.entities.DailyStats.update({
        where: {
          id: dailyStats.id
        },
        data: {
          totalViews,
          prevDayViewsChangePercent,
          userCount,
          paidUserCount,
          userDelta,
          paidUserDelta,
          totalRevenue
        }
      });
    }
    const sources = await getSources();
    for (const source of sources) {
      let visitors = source.visitors;
      if (typeof source.visitors !== "number") {
        visitors = parseInt(source.visitors);
      }
      await context.entities.PageViewSource.upsert({
        where: {
          date_name: {
            date: nowUTC,
            name: source.source
          }
        },
        create: {
          date: nowUTC,
          name: source.source,
          visitors,
          dailyStatsId: dailyStats.id
        },
        update: {
          visitors
        }
      });
    }
    console.table({ dailyStats });
  } catch (error) {
    console.error("Error calculating daily stats: ", error);
    await context.entities.Logs.create({
      data: {
        message: `Error calculating daily stats: ${error?.message}`,
        level: "job-error"
      }
    });
  }
};
async function fetchTotalStripeRevenue() {
  let totalRevenue = 0;
  let params = {
    limit: 100,
    // created: {
    //   gte: startTimestamp,
    //   lt: endTimestamp
    // },
    type: "charge"
  };
  let hasMore = true;
  while (hasMore) {
    const balanceTransactions = await stripe.balanceTransactions.list(params);
    for (const transaction of balanceTransactions.data) {
      if (transaction.type === "charge") {
        totalRevenue += transaction.amount;
      }
    }
    if (balanceTransactions.has_more) {
      params.starting_after = balanceTransactions.data[balanceTransactions.data.length - 1].id;
    } else {
      hasMore = false;
    }
  }
  const formattedRevenue = totalRevenue / 100;
  return formattedRevenue;
}

registerJob({
  job: dailyStatsJob,
  jobFn: calculateDailyStats
});

if (typeof globalThis.crypto === "undefined") {
  globalThis.crypto = webcrypto;
}

const startServer = async () => {
  await startPgBoss();
  const port = normalizePort(config$1.port);
  app.set("port", port);
  const server = http.createServer(app);
  server.listen(port);
  server.on("error", (error) => {
    if (error.syscall !== "listen")
      throw error;
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
      default:
        throw error;
    }
  });
  server.on("listening", () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log("Server listening on " + bind);
  });
};
startServer().catch((e) => console.error(e));
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port))
    return val;
  if (port >= 0)
    return port;
  return false;
}
//# sourceMappingURL=server.js.map
