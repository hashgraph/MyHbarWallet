/// <reference types="cypress" />
/* eslint-disable @typescript-eslint/no-require-imports */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

    // eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
    interface Chainable {
        keyStoreLogin(): Chainable;
    }
}

Cypress.Commands.add('keyStoreLogin', () => {
  const {
        KEY_ACCOUNT_ID,
        KEY_PRIVATE_KEY
    } = Cypress.env();

  cy.visit("/")
      .get("[data-cy-network-selector]")
      .filter(":visible")
      .click()
      .then(() => {
        cy.get("[data-cy-option]")
          .contains("testnet")
          .filter(":visible")
          .click();
      })
      .get("[data-cy-access-link]")
      .filter(":visible")
      .click()
      .get("[data-cy-option]")
      .contains("Software")
      .filter(":visible")
      .click()
      .get("[data-cy-option]")
      .contains("Private")
      .filter(":visible")
      .click()
      .get("[data-cy-key-input] input")
      .type(KEY_PRIVATE_KEY)
      .get("[data-cy-key-submit]")
      .click()
      .get("[data-cy-account-input] input")
      .type(KEY_ACCOUNT_ID)
      .get("[data-cy-account-submit]")
      .click()
      .wait(1000);
})

export default {};