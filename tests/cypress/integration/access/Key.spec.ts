describe("Key Access", () => {
  const { KEY_PRIVATE_KEY, KEY_ACCOUNT_ID } = Cypress.env();

  beforeEach(() => cy.viewport("macbook-13"));

  it("can access by private key", () => {
    cy.visit("/")
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

    cy.get("[data-cy-account-id]").should("contain", KEY_ACCOUNT_ID);
  });
});
