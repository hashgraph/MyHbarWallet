describe("Mnemonic Access", () => {
  const {
    MNEMONIC24P_PHRASE,
    MNEMONIC24P_ACCOUNT_ID,
    MNEMONIC24P_PASSWORD,
  } = Cypress.env();

  beforeEach(() => cy.viewport("macbook-13"));

  it("can access by mnemonic phrase (24 words, password)", () => {
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
      .contains("Mnemonic")
      .filter(":visible")
      .click()
      .get("[data-cy-segment-option]")
      .contains("24")
      .click()
      .then(() => {
        const words = MNEMONIC24P_PHRASE.split(",");
        for (let i = 0; i < 24; i++) {
          cy.get(`#mnemonic\\:${i + 1}`).type(words[i]);
        }
      })
      .get("[data-cy-switch]")
      .click()
      .get("[data-cy-pass-input] input")
      .type(MNEMONIC24P_PASSWORD)
      .get("[data-cy-mnemonic-submit]")
      .click()
      .get("[data-cy-account-input] input")
      .type(MNEMONIC24P_ACCOUNT_ID)
      .get("[data-cy-account-submit]")
      .click()
      .wait(1000);

    cy.get("[data-cy-account-id]").should(
      "contain",
      MNEMONIC24P_ACCOUNT_ID
    );
  });
});
