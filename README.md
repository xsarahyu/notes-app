## Welcome to your new SaaS App! 🎉
<a href="https://www.producthunt.com/posts/open-saas?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-open&#0045;saas" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=436467&theme=light" alt="Open&#0032;SaaS - Open&#0045;source&#0032;&#0038;&#0032;100&#0037;&#0032;free&#0032;React&#0032;&#0038;&#0032;Node&#0046;js&#0032;SaaS&#0032;starter&#0033; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

https://github.com/wasp-lang/open-saas/assets/70215737/5ff289b1-12b9-4b46-aa90-a6a3122de93e

You've decided to build a SaaS app with the Open SaaS template. Great choice! 

This template is:

1. fully open-source
2. completely free to use and distribute
3. comes with a ton of features out of the box!
4. focused on free, open-source services, where possible

🧑‍💻 Check it out in action here: [OpenSaaS.sh](https://opensaas.sh)  
📚 Check out the Docs here: [Open SaaS Docs](https://docs.opensaas.sh)

## What's inside?

The template itself is built on top of some very powerful tools and frameworks, including:

- 🐝 [Wasp](https://wasp-lang.dev) - a full-stack React, NodeJS, Prisma framework with superpowers
- 🚀 [Astro](https://starlight.astro.build/) - Astro's lightweight "Starlight" template for documentation and blog
- 💸 [Stripe](https://stripe.com) - for products and payments
- 📈 [Plausible](https://plausible.io) or [Google](https://analytics.google.com/) Analytics
- 🤖 [OpenAI](https://openai.com) - OpenAI API integrated into the app or [Replicate](https://replicate.com/) (coming soon 👀)
- 📦 [AWS S3](https://aws.amazon.com/s3/) - for file uploads
- 📧 [SendGrid](https://sendgrid.com), [MailGun](https://mailgun.com), or SMTP - for email sending
- 💅 [TailwindCSS](https://tailwindcss.com) - for styling
- 🧑‍💼 [TailAdmin](https://tailadmin.com/) - admin dashboard & components for TailwindCSS

Because we're using Wasp as the full-stack framework, we can leverage a lot of its features to build our SaaS in record time, including:

- 🔐 [Full-stack Authentication](https://wasp-lang.dev/docs/auth/overview) - Email verified + social Auth in a few lines of code.
- ⛑ [End-to-end Type Safety](https://wasp-lang.dev/docs/data-model/operations/overview) - Type your backend functions and get inferred types on the front-end automatically, without the need to install or configure any third-party libraries. Oh, and type-safe Links, too!
- 🤖 [Jobs](https://wasp-lang.dev/docs/advanced/jobs) - Run cron jobs in the background or set up queues simply by defining a function in the config file.
- 🚀 [One-command Deploy](https://wasp-lang.dev/docs/advanced/deployment/overview) - Easily deploy via the CLI to [Fly.io](https://fly.io), or to other providers like [Railway](https://railway.app) and [Netlify](https://netlify.com).

You also get access to Wasp's diverse, helpful community if you get stuck or need help.
- 🤝 [Wasp Discord](https://discord.gg/aCamt5wCpS)


Note that we've tried to get as many of the core features of a SaaS app into this template as possible, but there still might be some missing features or functionality.

We could always use some help tying up loose ends, so consider [contributing](https://github.com/wasp-lang/open-saas/blob/main/CONTRIBUTING.md)!


### Running Cypress for End-to-End Testing and Integration Testing

To run Cypress for your project, follow these steps:

1.  **Ensure you're in the project directory:** Navigate to your project directory using the terminal:
    
    bashCopy code
    
    `cd /path/to/your/project`
    
2.  **Install necessary dependencies:** Run the following command to install required dependencies:
    
    bashCopy code
    
    `sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb`
    
3.  **Install npm packages:** Next, install npm packages by running:
    
    bashCopy code
    
    `npm install`
    
4.  **Start your server:** Start your server using the appropriate command for your project.
    
5.  **Run your client-side:** Ensure your client-side application is running.
    
6.  **Run tests with Cypress:** Finally, execute the following command to run your Cypress tests:
    
    bashCopy code
    
    `npx cypress open`

## Running Cypress Tests

1. After executing the command `npx cypress open`, the Cypress Test Runner interface will open.

2. In the Cypress Test Runner, you'll see a list of available tests under the "Specs" section.

3. Click on the test suite labeled "e2e" or any other relevant label depending on your project structure. This test suite should be configured for end-to-end testing.

4. Next, you'll be prompted to choose a browser to run the tests in. Select "Electron" from the dropdown menu. This is typically under the "Run all specs" button.

5. After selecting "Start E2E Testing in Electron", Cypress will open a new window or tab containing the page where all the end-to-end tests are executed.

6. In the Cypress Test Runner interface, you'll see a list of available test files under the "specs" section. Select the specific test file you want to run by clicking on it.

7. The selected test will begin execution. During execution, you'll see the test steps being performed in the browser window/tab that Cypress opened.

8. If the test passes, the screen will turn green. If it fails, the screen will turn red, indicating which test step failed.

9. To continue testing other specs, click on the "specs" label in the sidebar to return to the main page of the Cypress Test Runner.

10. From the main page, you can select and run other test files one by one, following the same process as described above.


## Test Cases Overview

### LoginPage (Cypress)
- **Test Suite Description:** The Login Page
  - [Link to file](https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/login_page.cy.ts#L1)

  - **Specific Test Case:**
    - Test that you can login to the app
      - [Link to file](https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/login_page.cy.ts#L3)
      - Custom Cypress command: `cy.createUser()`
      - Command to visit the login page: `cy.visit('/login')`
      - Command to type username: `cy.get('@activeUser').then(activeUser => cy.get('input[name=username]').type(activeUser.username))`
      - Command to type password and submit form: `cy.get('@activeUser').then(activeUser => cy.get('input[name=password]').type(`${activeUser.password}{enter}`))`
      - Command to verify successful login: `cy.url().should('include', '/demo-app')`

### AccountSettings (Cypress)
- **Test Suite Description:** The AccountSettings Test
  - [Link to file](https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/account_settings.cy.ts#L1)

  - **Specific Test Case:**
    - Test that you can click the account settings page
      - [Link to file](https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/account_settings.cy.ts#L3)
      - Custom Cypress command: `cy.createUser()`
      - Command to set viewport size: `cy.viewport(1280, 800)`
      - Command to click dropdown menu: `cy.get('#dropdownmenu').click({force: true})`
      - Command to click account settings button: `cy.get('#accountsettingsbutton').click({force: true})`
      - Command to verify successful navigation to account settings page: `cy.url().should('eq', 'http://localhost:3000/account')`

### DocumentationPage (Cypress)
- **Test Suite Description:** The Documentation Page
  - [Link to file](https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/documentation_page.cy.ts#L1)

  - **Specific Test Case:**
    - Test that you can click the documentation page
      - [Link to file](https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/documentation_page.cy.ts#L3)
      - Custom Cypress command: `cy.createUser()`
      - Command to set viewport size: `cy.viewport(1280, 800)`
      - Command to click documentation link: `cy.get('a').contains('Documentation').click()`
      - Command to verify successful navigation to documentation page: `cy.origin('https://github.com/xsarahyu/notes-app', () => cy.url().should('eq', 'https://github.com/xsarahyu/notes-app'))`

### LogOut Page (Cypress)
- **Test Suite Description:** The Logout Test
  - [Link to file](https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/logout.cy.ts#L1)

  - **Specific Test Case:**
    - Test that you can click logout and it will log the user out
      - [Link to file](https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/logout.cy.ts#L3)
      - Custom Cypress command: `cy.createUser()`
      - Command to set viewport size: `cy.viewport(1280, 800)`
      - Command to click dropdown menu: `cy.get('#dropdownmenu').click({force: true})`
      - Command to click logout button: `cy.get('#logoutbutton').click({force: true})`
      - Command to verify successful logout and redirection to login page: `cy.url().should('eq', 'http://localhost:3000/login')`

### SignUp Page (Cypress)
- **Test Suite Description:** The Sign-up Page
  - [Link to file](https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/signup_page.cy.ts#L1)

  - **Specific Test Case:**
    - Allows a user to sign up
      - [Link to file](https://github.com/xsarahyu/notes-app/blob/aba16d63afe8ea40a88c16a06c155e9a5952be5b/app/cypress/e2e/signup_page.cy.ts#L3)
      - Custom Cypress command: `cy.createUser()`
      - Command to verify successful signup and navigation to demo page: `cy.url().should('include', '/demo-app')`
      - Command to verify successful sign-up message: `cy.contains('Add Note').should('be.visible')`
