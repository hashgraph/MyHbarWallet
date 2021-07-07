describe("Mnemonic Access", () => {
  const {
    MNEMONIC12_PHRASE,
    MNEMONIC12_ACCOUNT_ID,
    MNEMONIC22L_PHRASE,
    MNEMONIC22L_ACCOUNT_ID,
    MNEMONIC24_PHRASE,
    MNEMONIC24_ACCOUNT_ID,
    MNEMONIC24P_PHRASE,
    MNEMONIC24P_ACCOUNT_ID,
    MNEMONIC24P_PASSWORD,
    MNEMONIC24L_PHRASE,
    MNEMONIC24L_ACCOUNT_ID,
  } = Cypress.env();

  beforeEach(() => cy.viewport("macbook-13"));

  it("can access by mnemonic phrase (12 words)", () => {
    cy.visit("/")
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
      .contains("12")
      .click()
      .then(() => {
        const words = MNEMONIC12_PHRASE.split(",");
        for (let i = 0; i < 12; i++) {
          cy.get(`#mnemonic\\:${i + 1}`).type(words[i]);
        }
      })
      .get("[data-cy-mnemonic-submit]")
      .click()
      .get("[data-cy-account-input] input")
      .type(MNEMONIC12_ACCOUNT_ID)
      .get("[data-cy-account-submit]")
      .click()
      .wait(1000);

    cy.get("[data-cy-account-id]").should("contain", MNEMONIC12_ACCOUNT_ID);
  });

  it("can access by mnemonic phrase (22 words)", () => {
    cy.visit("/")
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
      .contains("22")
      .click()
      .then(() => {
        const words = MNEMONIC22L_PHRASE.split(",");
        for (let i = 0; i < 22; i++) {
          cy.get(`#mnemonic\\:${i + 1}`).type(words[i]);
        }
      })
      .get("[data-cy-mnemonic-submit]")
      .click()
      .get("[data-cy-account-input] input")
      .type(MNEMONIC22L_ACCOUNT_ID)
      .get("[data-cy-account-submit]")
      .click()
      .wait(1000);

    cy.get("[data-cy-account-id]").should(
      "contain",
      MNEMONIC22L_ACCOUNT_ID
    );
  });

  it("can access by mnemonic phrase (24 words)", () => {
    cy.visit("/")
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

  it("can access by legacy (retired hbar mobile app) mnemonic phrase (24 words)", () => {
    cy.visit("/")
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
        const words = MNEMONIC24L_PHRASE.split(",");
        for (let i = 0; i < 24; i++) {
          cy.get(`#mnemonic\\:${i + 1}`).type(words[i]);
        }
      })
      .get("[data-cy-mnemonic-submit]")
      .click()
      .get("[data-cy-account-input] input")
      .type(MNEMONIC24L_ACCOUNT_ID)
      .get("[data-cy-account-submit]")
      .click()
      .wait(1000);

    cy.get("[data-cy-account-id]").should(
      "contain",
      MNEMONIC24L_ACCOUNT_ID
    );
  });

  it("can access by mnemonic phrase (24 words, password)", () => {
    cy.visit("/")
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
      .get("[data-cy-pass-input]")
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
