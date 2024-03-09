import type { RouteDefinitionsToRoutes, OptionalRouteOptions } from './types';
export declare const routes: {
    readonly LandingPageRoute: {
        readonly to: "/";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly LoginRoute: {
        readonly to: "/login";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly SignupRoute: {
        readonly to: "/signup";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly DemoAppRoute: {
        readonly to: "/demo-app";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly PricingPageRoute: {
        readonly to: "/pricing";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly AccountRoute: {
        readonly to: "/account";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly CheckoutRoute: {
        readonly to: "/checkout";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly FileUploadRoute: {
        readonly to: "/file-upload";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly AdminRoute: {
        readonly to: "/admin";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly AdminUsersRoute: {
        readonly to: "/admin/users";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly AdminSettingsRoute: {
        readonly to: "/admin/settings";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly AdminChartsRoute: {
        readonly to: "/admin/chart";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly AdminMessagesRoute: {
        readonly to: "/admin/messages";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly AdminFormElementsRoute: {
        readonly to: "/admin/forms/form-elements";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly AdminFormLayoutsRoute: {
        readonly to: "/admin/forms/form-layouts";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly AdminCalendarRoute: {
        readonly to: "/admin/calendar";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly AdminUIAlertsRoute: {
        readonly to: "/admin/ui/alerts";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
    readonly AdminUIButtonsRoute: {
        readonly to: "/admin/ui/buttons";
        readonly build: (options?: OptionalRouteOptions) => string;
    };
};
export type Routes = RouteDefinitionsToRoutes<typeof routes>;
export { Link } from './Link';
