describe("Mnemonic Access", () => {
  const {
    MNEMONIC24_PHRASE,
    MNEMONIC24_ACCOUNT_ID,
  } = Cypress.env();

  beforeEach(() => cy.viewport("macbook-13"));
  
  it("can access by mnemonic phrase (24 words)", () => {
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
        const words = MNEMONIC24_PHRASE.split(",");
        for (let i = 0; i < 24; i++) {
          cy.get(`#mnemonic\\:${i + 1}`).type(words[i]);
        }
      })
      .get("[data-cy-mnemonic-submit]")
      .click()
      .get("[data-cy-account-input] input")
      .type(MNEMONIC24_ACCOUNT_ID)
      .get("[data-cy-account-submit]")
      .click()
      .wait(1000);

    cy.get("[data-cy-account-id]").should("contain", MNEMONIC24_ACCOUNT_ID);
  });
});
