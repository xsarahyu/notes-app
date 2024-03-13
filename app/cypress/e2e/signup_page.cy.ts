describe('The Sign-up Page', () => {

  it('allows a user to sign up', () => {
    // Visit the sign-up page
    cy.visit('/signup');
    
    const username = "newuser5"
    const password = "newpassword1"
    // Fill out the sign-up form with appropriate data
    cy.get('input[name=username]').type('newuser4');
    cy.get('input[name=password]').type('newpassword1');

    // Submit the sign-up form
    cy.get('button[type=submit]').click();

    // Check if the user is redirected to the expected page after signing up
    cy.url().should('include', '/demo-app');

    // Check if the sign-up message or confirmation is displayed
    cy.contains('Add Note').should('be.visible');
  })
})
