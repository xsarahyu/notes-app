describe('The Login Page', () => {

  it('test that you can login to the app', function () {

    //Creating Usr and Pass for Login Puposes
    const username = "test"
    const password = "testing1"
    cy.visit('/login')

    //Input username
    cy.get('input[name=username]').type(username)

    // Input password
    cy.get('input[name=password]').type(`${password}{enter}`)

    // we should be redirected to /demo-app
    cy.url().should('include', '/demo-app')

  })
})