const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: [
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      'cypress/integration/api/**/*.cy.{js,jsx,ts,tsx}'
    ],
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
    },
  },

});
