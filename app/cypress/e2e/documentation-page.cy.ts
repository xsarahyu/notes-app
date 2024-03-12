describe('The Documentation Page', () => {

  it('test that you can click the documentation page', function () {

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


    // Clicks on the Documentation button in the navbar
    cy.get('a').contains('Documentation').click()

    // Allows the test to bypass a single origin url
    cy.origin('https://docs.opensaas.sh', () => {

      // Test to see if the current url equals the document page
      cy.url().should('eq', 'https://docs.opensaas.sh/')
  })
  })
})