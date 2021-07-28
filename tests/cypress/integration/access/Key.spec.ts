/// <reference types="cypress" />

describe("Key Access", () => {
  const { KEY_ACCOUNT_ID } = Cypress.env();

  beforeEach(() => cy.viewport("macbook-13"));

  it("can access by private key", () => {
    cy.keyStoreLogin();

    cy.get("[data-cy-account-id]").should("contain", KEY_ACCOUNT_ID);
  });
});
