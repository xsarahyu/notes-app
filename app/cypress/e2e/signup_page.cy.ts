describe('The Sign-up Page', () => {

  it('allows a user to sign up', () => {

    //Created a Custom Command: Goes to sign up page and creates a user 
    cy.createUser()

    // Check if the user is redirected to the expected page after signing up
    cy.url().should('include', '/demo-app');

    // Check if the sign-up message or confirmation is displayed
    cy.contains('Add Note').should('be.visible');
  })
})

