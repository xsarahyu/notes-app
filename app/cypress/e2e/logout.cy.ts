describe('The Logout Test', () => {

  it('test that you can click logout and it will log the user out', function () {

    //Creating Usr and Pass for Login Puposes
    const username = "testtest"
    const password = "testtest1"
    cy.visit('/login')

    //Input username
    cy.get('input[name=username]').type(username)

    // Input password
    cy.get('input[name=password]').type(`${password}{enter}`)
  
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
