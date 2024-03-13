//Sets the username as a unique user
const timestamplogoutpage = new Date().getTime()
const globalusernamelogoutpage = `user${timestamplogoutpage}`
const globalpasswordlogoutpage = "newpassword1"

// Creates a new user before test
beforeEach(function() {
  cy.visit('/signup');   
    // Fill out the sign-up form with appropriate data
    cy.get('input[name=username]').type(globalusernamelogoutpage);
    cy.get('input[name=password]').type(globalpasswordlogoutpage);

    // Submit the sign-up form
    cy.get('button[type=submit]').click();
})

describe('The Logout Test', () => {

  it('test that you can click logout and it will log the user out', function () {

    // Go back to the app main page
    cy.visit('/demo-app')

    // View the app as if it were a computer screen
    cy.viewport(1280, 800)

    // Opens the menu and keeps the dropdown menu open
    cy.get('#dropdownmenu').click({force: true});

    // clicks the logoutbutton and keeps the dropdown menu open
    cy.get('#logoutbutton').click({force: true});

    // Test to see if the current url equals the document page
    cy.url().should('eq', 'http://localhost:3000/login')
  })
})
