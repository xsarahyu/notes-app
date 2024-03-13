// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands'

// cypress/support/e2e.ts
import { registerCommands } from './commands'

registerCommands()

// Alternatively you can use CommonJS syntax:
// require('./commands')

//TEMP FIX (for issue prompted by fullstack app wasp): 
  //This event handler captures uncaught exceptions, specifically filtering out errors related to "Unexpected end of input" to prevent them from disrupting test execution credit: https://docs.cypress.io/api/cypress-api/catalog-of-events#To-conditionally-turn-off-uncaught-exception-handling-for-a-certain-error
Cypress.on('uncaught:exception', (err, runnable) => {
  
  if (err.message.includes('Unexpected end of input')) {
    return false
  }


  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
})

