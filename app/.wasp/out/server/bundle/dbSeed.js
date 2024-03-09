import { prisma } from 'wasp/server';
import { faker } from '@faker-js/faker';
import { z } from 'zod';

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

function createRandomUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const user = {
    email: faker.internet.email({
      firstName,
      lastName
    }),
    username: faker.internet.userName({
      firstName,
      lastName
    }),
    createdAt: faker.date.between({ from: /* @__PURE__ */ new Date("2023-01-01"), to: /* @__PURE__ */ new Date() }),
    lastActiveTimestamp: faker.date.recent(),
    isAdmin: false,
    stripeId: `cus_${faker.string.uuid()}`,
    hasPaid: faker.helpers.arrayElement([true, false]),
    sendEmail: false,
    subscriptionStatus: faker.helpers.arrayElement(["active", "canceled", "past_due", "deleted"]),
    datePaid: faker.date.recent(),
    credits: faker.number.int({ min: 0, max: 3 }),
    checkoutSessionId: null,
    subscriptionTier: faker.helpers.arrayElement([TierIds.HOBBY, TierIds.PRO])
  };
  return user;
}
const USERS = faker.helpers.multiple(createRandomUser, {
  count: 50
});
async function devSeedUsers(prismaClient) {
  try {
    await Promise.all(
      USERS.map(async (user) => {
        await prismaClient.user.create({
          data: user
        });
      })
    );
  } catch (error) {
    console.error(error);
  }
}

const seeds = {
  devSeedUsers
};
async function main() {
  const nameOfSeedToRun = process.env.WASP_DB_SEED_NAME;
  if (nameOfSeedToRun) {
    console.log(`Running seed: ${nameOfSeedToRun}`);
  } else {
    console.error("Name of the seed to run not specified!");
  }
  await seeds[nameOfSeedToRun](prisma);
}
main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
//# sourceMappingURL=dbSeed.js.map
