import { z } from 'zod';
export var TierIds;
(function (TierIds) {
    TierIds["HOBBY"] = "hobby-tier";
    TierIds["PRO"] = "pro-tier";
    TierIds["ENTERPRISE"] = "enterprise-tier";
})(TierIds || (TierIds = {}));
export const DOCS_URL = 'https://docs.opensaas.sh';
export const BLOG_URL = 'https://docs.opensaas.sh/blog';
const isDevEnv = process.env.NODE_ENV !== 'production';
const customerPortalTestUrl = '<your-url-here>'; // TODO: find your test url at https://dashboard.stripe.com/test/settings/billing/portal
const customerPortalProdUrl = '<your-url-here>'; // TODO: add before deploying to production
export const STRIPE_CUSTOMER_PORTAL_LINK = isDevEnv ? customerPortalTestUrl : customerPortalProdUrl;
checkStripePortalLinksExist({ customerPortalTestUrl, customerPortalProdUrl });
function checkStripePortalLinksExist(links) {
    const schema = z.string().url();
    const testResult = schema.safeParse(links.customerPortalTestUrl);
    const prodResult = schema.safeParse(links.customerPortalProdUrl);
    let consoleMsg = {
        color: '\x1b[33m%s\x1b[0m',
        msg: '',
    };
    if (testResult.success && prodResult.success) {
        consoleMsg.color = '\x1b[32m%s\x1b[0m';
        consoleMsg.msg = '✅ Both STRIPE_CUSTOMER_PORTAL_LINK links defined';
    }
    else if (!testResult.success && !prodResult.success) {
        consoleMsg.msg = '⛔️ STRIPE_CUSTOMER_PORTAL_LINK is not defined';
    }
    else if (!testResult.success) {
        consoleMsg.msg = '⛔️ STRIPE_CUSTOMER_PORTAL_LINK is not defined for test env';
    }
    else {
        consoleMsg.msg = '⛔️ STRIPE_CUSTOMER_PORTAL_LINK is not defined for prod env';
    }
    console.log(consoleMsg.color, consoleMsg.msg);
}
//# sourceMappingURL=constants.js.map