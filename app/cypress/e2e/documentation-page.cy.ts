//Sets the username as a unique user
const timestampdocpage = new Date().getTime()
const globalusernamedocpage = `user${timestampdocpage}`
const globalpassworddocpage = "newpassword1"

// Creates a new user before test
beforeEach(function() {
  cy.visit('/signup');   
    // Fill out the sign-up form with appropriate data
    cy.get('input[name=username]').type(globalusernamedocpage);
    cy.get('input[name=password]').type(globalpassworddocpage);

    // Submit the sign-up form
    cy.get('button[type=submit]').click();
})

describe('The Documentation Page', () => {

  it('test that you can click the documentation page', function () {
    // Go back to the app main page
    cy.visit('/demo-app')

    // View the app as if it were a computer screen
    cy.viewport(1280, 800)


    // Clicks on the Documentation button in the navbar
    cy.get('a').contains('Documentation').click()

    // Allows the test to bypass a single origin url
    cy.origin('https://docs.opensaas.sh', () => {

      // Test to see if the current url equals the document page
      cy.url().should('eq', 'https://docs.opensaas.sh/')
  })
  })
})