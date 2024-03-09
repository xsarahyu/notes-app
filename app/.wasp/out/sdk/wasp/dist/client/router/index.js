import { interpolatePath } from './linkHelpers';
// PUBLIC API
export const routes = {
    LandingPageRoute: {
        to: "/",
        build: (options) => interpolatePath("/", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    LoginRoute: {
        to: "/login",
        build: (options) => interpolatePath("/login", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    SignupRoute: {
        to: "/signup",
        build: (options) => interpolatePath("/signup", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    DemoAppRoute: {
        to: "/demo-app",
        build: (options) => interpolatePath("/demo-app", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    PricingPageRoute: {
        to: "/pricing",
        build: (options) => interpolatePath("/pricing", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    AccountRoute: {
        to: "/account",
        build: (options) => interpolatePath("/account", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    CheckoutRoute: {
        to: "/checkout",
        build: (options) => interpolatePath("/checkout", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    FileUploadRoute: {
        to: "/file-upload",
        build: (options) => interpolatePath("/file-upload", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    AdminRoute: {
        to: "/admin",
        build: (options) => interpolatePath("/admin", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    AdminUsersRoute: {
        to: "/admin/users",
        build: (options) => interpolatePath("/admin/users", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    AdminSettingsRoute: {
        to: "/admin/settings",
        build: (options) => interpolatePath("/admin/settings", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    AdminChartsRoute: {
        to: "/admin/chart",
        build: (options) => interpolatePath("/admin/chart", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    AdminMessagesRoute: {
        to: "/admin/messages",
        build: (options) => interpolatePath("/admin/messages", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    AdminFormElementsRoute: {
        to: "/admin/forms/form-elements",
        build: (options) => interpolatePath("/admin/forms/form-elements", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    AdminFormLayoutsRoute: {
        to: "/admin/forms/form-layouts",
        build: (options) => interpolatePath("/admin/forms/form-layouts", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    AdminCalendarRoute: {
        to: "/admin/calendar",
        build: (options) => interpolatePath("/admin/calendar", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    AdminUIAlertsRoute: {
        to: "/admin/ui/alerts",
        build: (options) => interpolatePath("/admin/ui/alerts", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
    AdminUIButtonsRoute: {
        to: "/admin/ui/buttons",
        build: (options) => interpolatePath("/admin/ui/buttons", undefined, options === null || options === void 0 ? void 0 : options.search, options === null || options === void 0 ? void 0 : options.hash),
    },
};
// PUBLIC API
export { Link } from './Link';
//# sourceMappingURL=index.js.map