describe('The AccountSettings Test', () => {

  it('test that you can click the account settings page', function () {
     //Created a Custom Command: Goes to sign up page and creates a user 
    cy.createUser()

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