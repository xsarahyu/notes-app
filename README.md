# 📝 Notes App

## 👋 Introduction
Welcome to the [**Notes App**](https://ascend-notes-app-client.fly.dev/), a simple and user-friendy application for managing notes. The application is powered by [Wasp](https://wasp-lang.dev), a fullstack React, NodeJS, and Prisma framework.

## ⭐ Features
- 🔐 Authentication: Securely register for and access your account
- ✍️ Create notes: Easily compose and save your thoughts
- ✅ Mark completed: Indicate task completion with a simple checkbox
- 🗑️ Delete notes: Seamlessly remove unwanted notes
- 💾 Auto-save notes: Enjoy peace of mind as notes are saved automatically

## 🚀 Getting Started
1. Install [Wasp](https://docs.opensaas.sh/start/getting-started/)
1. Clone the repository: https://github.com/xsarahyu/notes-app.git
2. Navigate to the app directory: `cd app`
3. Run the server: `wasp start db`
4. Run the client: `wasp start`
5. The app is now live at http://localhost:3000!

## 🗂️ (Relevant) File Structure
The Wasp template provides many features that are irrelevant to the notes app, like Stripe payments, Google Analytics, and more. The following are the components and pages we utilized:

app/src
├── client
│   ├── admin
│   │   ├── common
│   │   │   ├── Loader
│   │   │   |   ├── index.tsx
│   │   ├── components
│   │   │   ├── DarkModeSwitcher.tsx
|   |   |   ├── Header.tsx
|   |   |   ├── Sidebar.tsx
|   |   |   ├── SidebarLinkGroup.tsx
│   │   ├── layout
│   │   │   ├── DefaultLayout.tsx
│   ├── app
│   │   ├── DemoAppPage.tsx
│   ├── auth
│   │   ├── authWrapper.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   ├── components
│   │   ├── AppNavBar.tsx
│   │   ├── DropdownUser.tsx
│   │   ├── UserMenuItems.tsx
│   ├── hooks
│   │   ├── useColorMode.tsx
│   │   ├── useLocalStorage.tsx
│   ├── landing-page
│   │   ├── contentSections.tsx
│   │   ├── LandingPage.tsx
│   ├── App.tsx
│   ├── Main.css
├── server
│   ├── auth
│   │   ├── setUsername.tsx
│   ├── actions.ts
├── shared
│   ├── constants.ts

<br>
<br>
<hr style="border: 5px solid black">
<br>
<br>

# 🧪 Testing
## Unit & Integration Tests — Using Vitest
To run Vitest tests locally:
1. Navigate to the app directory: `cd app`
2. Install dependencies: `npm install`
3. Run the tests: `npm run test-ui` (this is a script that we made)

### 👉 DarkModeSwitcher component
#### Test #1: The DarkModeSwitcher component is a UI switcher element designed to toggle between light and dark color modes. The test ensures that the switching functionality works as expected.
https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/src/client/admin/components/DarkModeSwitcher.test.jsx#L6-L24

### 👉 DemoAppPage
#### Test #1: Ensures that users can create a new note by entering text into the input field and clicking the "Add Note" button.
https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/src/client/app/DemoAppPage.test.tsx#L13-L54

#### Test #2: Verifies that users can check and uncheck a note by toggling its checkbox.
https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/src/client/app/DemoAppPage.test.tsx#L58-L93

#### Test #3: Ensures that users can delete a note by clicking the delete button associated with it.
https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/src/client/app/DemoAppPage.test.tsx#L97-L134

#### Test #4: Ensures that the default text elements are displayed correctly when the page is loaded.
https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/src/client/app/DemoAppPage.test.tsx#L137-L148

### 👉 AppNavBar component
#### Test #1: Ensures that the navigation links in the navbar are rendered correctly.
https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/src/client/components/AppNavBar.test.jsx#L7-L15

### 👉 LandingPage
#### Test #1: Ensures that the header renders correctly.
https://github.com/xsarahyu/notes-app/blob/3639c4efd2c56d36c2a464ff166868c6a4a307d3/app/src/client/landing-page/LandingPage.test.tsx#L16-L24

#### Test #2: Ensures that the hero section renders correctly.
https://github.com/xsarahyu/notes-app/blob/3639c4efd2c56d36c2a464ff166868c6a4a307d3/app/src/client/landing-page/LandingPage.test.tsx#L26-L36

#### Test #3: Ensures that the features section renders correctly.
https://github.com/xsarahyu/notes-app/blob/3639c4efd2c56d36c2a464ff166868c6a4a307d3/app/src/client/landing-page/LandingPage.test.tsx#L38-L50

#### Test #4: Verifies that clicking the "Get Started" button leads to the signup page.
https://github.com/xsarahyu/notes-app/blob/3639c4efd2c56d36c2a464ff166868c6a4a307d3/app/src/client/landing-page/LandingPage.test.tsx#L54-L68

## Unit & End-to-End Tests — Using Cypress
To run Cypress tests locally:
1. Navigate to the app directory: `cd app`
2. Install Linux dependencies: `sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb`
3. Install other dependencies: `npm install`
4. Run the server: `wasp start db`
5. Run the client: `wasp start`
6. Run the tests: `npx cypress open`

### 👉 account_settings
#### The account_settings test suite verifies the functionality of accessing the account settings page.
https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/account_settings.cy.ts#L1C1-L19C3

### 👉 documentation_page
#### The documentation_page test suite verifies the functionality of accessing the documentation page.
https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/documentation_page.cy.ts#L1-L22

### 👉 login_page
#### The login_page test suite verifies the functionality of logging in.
https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/login_page.cy.ts#L1-L23

### 👉 logout
#### The logout suite verifies the functionality of logging out.
https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/logout.cy.ts#L1-L20

### 👉 signup_page
#### The signup_page test suite validates the functionality of the sign-up process.
https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/signup_page.cy.ts#L1-L14