import { interpolatePath } from './linkHelpers'
import type {
  RouteDefinitionsToRoutes,
  OptionalRouteOptions,
  ParamValue,
} from './types'

// PUBLIC API
export const routes = {
  LandingPageRoute: {
    to: "/",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/", undefined, options?.search, options?.hash),
  },
  LoginRoute: {
    to: "/login",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/login", undefined, options?.search, options?.hash),
  },
  SignupRoute: {
    to: "/signup",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/signup", undefined, options?.search, options?.hash),
  },
  DemoAppRoute: {
    to: "/demo-app",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/demo-app", undefined, options?.search, options?.hash),
  },
  PricingPageRoute: {
    to: "/pricing",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/pricing", undefined, options?.search, options?.hash),
  },
  AccountRoute: {
    to: "/account",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/account", undefined, options?.search, options?.hash),
  },
  CheckoutRoute: {
    to: "/checkout",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/checkout", undefined, options?.search, options?.hash),
  },
  FileUploadRoute: {
    to: "/file-upload",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/file-upload", undefined, options?.search, options?.hash),
  },
  AdminRoute: {
    to: "/admin",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin", undefined, options?.search, options?.hash),
  },
  AdminUsersRoute: {
    to: "/admin/users",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/users", undefined, options?.search, options?.hash),
  },
  AdminSettingsRoute: {
    to: "/admin/settings",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/settings", undefined, options?.search, options?.hash),
  },
  AdminChartsRoute: {
    to: "/admin/chart",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/chart", undefined, options?.search, options?.hash),
  },
  AdminMessagesRoute: {
    to: "/admin/messages",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/messages", undefined, options?.search, options?.hash),
  },
  AdminFormElementsRoute: {
    to: "/admin/forms/form-elements",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/forms/form-elements", undefined, options?.search, options?.hash),
  },
  AdminFormLayoutsRoute: {
    to: "/admin/forms/form-layouts",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/forms/form-layouts", undefined, options?.search, options?.hash),
  },
  AdminCalendarRoute: {
    to: "/admin/calendar",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/calendar", undefined, options?.search, options?.hash),
  },
  AdminUIAlertsRoute: {
    to: "/admin/ui/alerts",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/ui/alerts", undefined, options?.search, options?.hash),
  },
  AdminUIButtonsRoute: {
    to: "/admin/ui/buttons",
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/ui/buttons", undefined, options?.search, options?.hash),
  },
} as const;

// PRIVATE API
export type Routes = RouteDefinitionsToRoutes<typeof routes>

// PUBLIC API
export { Link } from './Link'
