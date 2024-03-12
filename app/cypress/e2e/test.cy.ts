describe('Note app', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000/login')
  })

  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('input:first').type('testtest')
    cy.get('input:last').type('testtest1')
  })  
})