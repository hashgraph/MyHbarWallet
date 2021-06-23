describe("Keystore Access", () => {
  const { KEY_ACCOUNT_ID, KEYSTORE_PASSWORD, KEYSTORE_ACCOUNT_ID } =
        Cypress.env();

  beforeEach(() => cy.viewport("macbook-13"));

  it("can access by keystore", () => {
    cy.visit("/")
      .get("[data-cy-access-link]")
      .filter(":visible")
      .click()
      .get("[data-cy-option]")
      .contains("Software")
      .filter(":visible")
      .click()
      .get("[data-cy-option]")
      .contains("Keystore")
      .filter(":visible")
      .click()
      .get("[data-cy-file-upload]")
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      .attachFile("Keystore")
      .trigger("change", { force: true })
      .get("input:visible")
      .type(KEYSTORE_PASSWORD)
      .get("[data-cy-keystore-submit]")
      .click()
      .get("[data-cy-account-input] input")
      .type(KEY_ACCOUNT_ID)
      .get("[data-cy-account-submit]")
      .click()
      .wait(1000);

    cy.get("[data-cy-account-id]").should("contain", KEYSTORE_ACCOUNT_ID);
  });
});
