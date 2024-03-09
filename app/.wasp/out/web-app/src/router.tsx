import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import App from '../../../../src/client/App'

import createAuthRequiredPage from "./auth/pages/createAuthRequiredPage"

import LandingPage from '../../../../src/client/landing-page/LandingPage'
import LoginPage from '../../../../src/client/auth/LoginPage'
import { Signup as SignupPage } from '../../../../src/client/auth/SignupPage'
import DemoAppPage from '../../../../src/client/app/DemoAppPage'
import AccountPage from '../../../../src/client/app/AccountPage'
import CheckoutPage from '../../../../src/client/app/CheckoutPage'
import FileUploadPage from '../../../../src/client/app/FileUploadPage'
import DashboardPage from '../../../../src/client/admin/pages/DashboardPage'
import AdminUsersPage from '../../../../src/client/admin/pages/Users'
import AdminSettingsPage from '../../../../src/client/admin/pages/Settings'
import AdminChartsPage from '../../../../src/client/admin/pages/Chart'
import AdminMessagesPage from '../../../../src/client/admin/pages/Messages'
import AdminFormElementsPage from '../../../../src/client/admin/pages/Form/FormElements'
import AdminFormLayoutsPage from '../../../../src/client/admin/pages/Form/FormLayout'
import AdminCalendarPage from '../../../../src/client/admin/pages/Calendar'
import AdminUIAlertsPage from '../../../../src/client/admin/pages/UiElements/Alerts'
import AdminUIButtonsPage from '../../../../src/client/admin/pages/UiElements/Buttons'


import { routes } from 'wasp/client/router'

export const routeNameToRouteComponent = {
  LandingPageRoute: LandingPage,
  LoginRoute: LoginPage,
  SignupRoute: SignupPage,
  DemoAppRoute: createAuthRequiredPage(DemoAppPage),
  AccountRoute: createAuthRequiredPage(AccountPage),
  CheckoutRoute: createAuthRequiredPage(CheckoutPage),
  FileUploadRoute: createAuthRequiredPage(FileUploadPage),
  AdminRoute: createAuthRequiredPage(DashboardPage),
  AdminUsersRoute: createAuthRequiredPage(AdminUsersPage),
  AdminSettingsRoute: createAuthRequiredPage(AdminSettingsPage),
  AdminChartsRoute: createAuthRequiredPage(AdminChartsPage),
  AdminMessagesRoute: createAuthRequiredPage(AdminMessagesPage),
  AdminFormElementsRoute: createAuthRequiredPage(AdminFormElementsPage),
  AdminFormLayoutsRoute: createAuthRequiredPage(AdminFormLayoutsPage),
  AdminCalendarRoute: createAuthRequiredPage(AdminCalendarPage),
  AdminUIAlertsRoute: createAuthRequiredPage(AdminUIAlertsPage),
  AdminUIButtonsRoute: createAuthRequiredPage(AdminUIButtonsPage),
} as const;

const router = (
  <Router basename="/">
    <App>
    <Switch>
      {Object.entries(routes).map(([routeKey, route]) => (
        <Route
          exact
          key={routeKey}
          path={route.to}
          component={routeNameToRouteComponent[routeKey]}
        />
      ))}
    </Switch>
    </App>
  </Router>
)

export default router
