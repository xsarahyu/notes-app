//Sets the username as a unique user
const timestampaccountpage = new Date().getTime()
const globalusernameaccountpage = `user${timestampaccountpage}`
const globalpasswordaccountpage = "newpassword1"

// Creates a new user before test
beforeEach(function() {
  cy.visit('/signup');   
    // Fill out the sign-up form with appropriate data
    cy.get('input[name=username]').type(globalusernameaccountpage);
    cy.get('input[name=password]').type(globalpasswordaccountpage);

    // Submit the sign-up form
    cy.get('button[type=submit]').click();
})


describe('The AccountSettings Test', () => {

  it('test that you can click the account settings page', function () {

    // Go back to the app main page
    cy.visit('/demo-app')

    // View the app as if it were a computer screen
    cy.viewport(1280, 800)

    // Opens the menu and keeps the dropdown menu open
    cy.get('#dropdownmenu').click({force: true});

    // clicks the account settings and keeps the dropdown menu open
    cy.get('#accountsettingsbutton').click({force: true});

    // Test to see if the current url equals the accoount page
    cy.url().should('eq', 'http://localhost:3000/account')
  })
})