describe('The Notes Test', () => {
  beforeEach(() => {
    // Custom command: Go to sign up page and create a user
    cy.createUser()

    // View the app on 1280x800 size screen
    cy.viewport(1280, 800)

    // Click the demo app
    cy.get('a[href="/demo-app"]').click()

    // Assert that URL is '/demo-app'
    cy.url().should('eq', 'http://localhost:3000/demo-app')

    // Type a note
    cy.get('#description').click().type('Test note')

    // Click the button to add the note
    cy.contains('Add Note').click()
  })

  it('Can make a note', function () {
    // Assert that notes section contains 'Test note'
    cy.get('.space-y-4').should('contain', 'Test note')
  })

  it('Can check off a note', function () {
    // Click the checkbox
    cy.contains('Test note').siblings('input[type="checkbox"]').check()

    // Assert that checkbox is checked
    cy.contains('Test note').siblings('input[type="checkbox"]').should('be.checked')

    // Assert that note is crossed out
    cy.contains('Test note').should('have.class', 'line-through')
  })

  it('Can delete a note', function() {
    // Click the delete button
    cy.get('button[class="p-1"]').click()

    // Assert that note is gone
    cy.contains('Test note').should('not.exist')
  })
})
