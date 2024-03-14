describe('The Documentation Page', () => {

  it('test that you can click the documentation page', function () {

    // Created a Custom Command: Goes to sign up page and creates a user 
    cy.createUser()

    // View the app as if it were a computer screen
    cy.viewport(1280, 800)

    // Clicks on the Documentation button in the navbar
    cy.get('a').contains('Documentation').click()

    // Allows the test to bypass a single origin url
    cy.origin('https://github.com/xsarahyu/notes-app', () => {

      // Test to see if the current url equals the document page
      cy.url().should('eq', 'https://github.com/xsarahyu/notes-app')
    })
  })
})