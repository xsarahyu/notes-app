/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
//To be able to access this command in different files 
declare global {
  namespace Cypress {
    interface Chainable {
      createUser(): Chainable<void>
    }
  }
}

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
// cypress/support/commands.ts
/* 
* @param 
*/
export function registerCommands(){
  Cypress.Commands.add('createUser', () => {
      // Visit the sign-up page
      cy.visit('/signup');
      
      const timestampaccountpage = new Date().getTime()
      const usr = `user${timestampaccountpage}`
      const pwd = "newpassword1"

      const activeUser = {
        username: usr,
        password: pwd
      };
      
      //Create a custom command to return a user (object)
      cy.wrap(activeUser).as('activeUser');

      // Fill out the sign-up form with appropriate data
      cy.get('input[name=username]').type(usr);
      cy.get('input[name=password]').type(pwd);

      // Submit the sign-up form
      cy.get('button[type=submit]').click();
  })
}