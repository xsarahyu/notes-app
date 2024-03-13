describe('The Login Page', () => {

  it('test that you can login to the app', function () {

    //Created a Custom Command: Goes to sign up page and creates a user 
    cy.createUser()
    
    cy.visit('/login')

    // Access input element "activeUser" with properties usr and pwd
    cy.get('@activeUser').then(activeUser => {

      //Input username w/ object 
      cy.get('input[name=username]').type(activeUser.username)

      // Input password w/ object 
      cy.get('input[name=password]').type(`${activeUser.password}{enter}`)

      // we should be redirected to /demo-app
      cy.url().should('include', '/demo-app')
    });
  })
})