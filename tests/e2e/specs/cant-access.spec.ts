/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

import {
    softwareTile,
    keystoreOption,
    hiddenFileInput,
    keystorePasswordInput,
    keystorePasswordBtn,
    networkSelector,
    testnetNetworkOption,
    accountIdInput,
    accountIdContinueButton,
    mnemonicPhraseOption,
    accessContinueButton,
    mnemonicContinueButton,
    mnemonicToggle,
    mnemonicPasswordToggle,
    mnemonicPasswordInput,
    privateKeyOption,
    privateKeyInput,
    privateKeyContinueButton,
    mnemonicInput
} from "../fixtures/access";

// Note: Netlify cannot currently parse JSON arrays (however they are specified)
// Therefore, we use comma-separated strings for arrays

describe("Access Genesis Account", () => {
    const genesisAccount = "0.0.1";
    const error = "This account is not associated with your key";

    beforeEach(() => {
        cy.viewport("ipad-2");
        cy.visit("/").get(".tile-grid > [href='/access-my-account']").click();
        cy.url().should("include", "access-my-account");
    });

    it("Can't access by Keystore", () => {
        const { KEYSTORE_PASSWORD } = Cypress.env();

        cy
            .get(softwareTile)
            .click()
            .get(keystoreOption)
            .click()
            .get(hiddenFileInput)
            .attachFile("Keystore")
            .get(keystorePasswordInput)
            .type(KEYSTORE_PASSWORD)
            .get(keystorePasswordBtn)
            .click()
            .get(networkSelector)
            .click()
            .then(() => {
                cy.get(testnetNetworkOption).click();
            })
            .get(accountIdInput)
            .type(genesisAccount)
            .then(() => {
                cy.get(accountIdContinueButton).click();
            });
        cy.wait(500);
        cy.get(".error").its("text").should("be", error);
        cy.url().should("include", "access-my-account");
    });

    it("Can't access by Mnemonic Phrase (24 Words)", () => {
        const { MNEMONIC_PHRASE } = Cypress.env();

        const phrase = MNEMONIC_PHRASE.split(",");

        cy
            .get(softwareTile)
            .click()
            .get(mnemonicPhraseOption)
            .click()
            .get(accessContinueButton)
            .click()
            .then(() => {
                for (let i = 1; i < 25; i++) {
                    cy.get(mnemonicInput(i.toString())).type(phrase[ i - 1 ]);
                }
            })
            .get(mnemonicContinueButton)
            .click()
            .get(networkSelector)
            .click()
            .then(() => {
                cy.get(testnetNetworkOption).click();
            })
            .get(accountIdInput)
            .type(genesisAccount)
            .then(() => {
                cy.get(accountIdContinueButton).click();
            });
        cy.wait(500);
        cy.get(".error").its("text").should("be", error);
        cy.url().should("include", "access-my-account");
    });

    it("Can't access by Mnemonic Phrase (22 Words)", () => {
        const { MNEMONICL_PHRASE } = Cypress.env();

        const phrase = MNEMONICL_PHRASE.split(",");

        cy
            .get(softwareTile)
            .click()
            .get(mnemonicPhraseOption)
            .click()
            .get(accessContinueButton)
            .click()
            .get(mnemonicToggle)
            .click()
            .then(() => {
                for (let i = 1; i < 23; i++) {
                    cy.get(mnemonicInput(i.toString())).type(phrase[ i - 1 ]);
                }
            })
            .get(mnemonicContinueButton)
            .click()
            .get(networkSelector)
            .click()
            .then(() => {
                cy.get(testnetNetworkOption).click();
            })
            .get(accountIdInput)
            .type(genesisAccount)
            .then(() => {
                cy.get(accountIdContinueButton).click();
            });
        cy.wait(500);
        cy.get(".error").its("text").should("be", error);
        cy.url().should("include", "access-my-account");
    });

    it("Can't access by Mnemonic Phrase with Password", () => {
        const {
            MNEMONICP_PHRASE,
            MNEMONICP_PASSWORD
        } = Cypress.env();

        const phrase = MNEMONICP_PHRASE.split(",");

        cy
            .get(softwareTile)
            .click()
            .get(mnemonicPhraseOption)
            .click()
            .get(accessContinueButton)
            .click()
            .then(() => {
                for (let i = 1; i < 25; i++) {
                    cy.get(mnemonicInput(i.toString())).type(phrase[ i - 1 ]);
                }
            })
            .get(mnemonicPasswordToggle)
            .click()
            .then(() => {
                cy.get(mnemonicPasswordInput).type(MNEMONICP_PASSWORD);
            })
            .get(mnemonicContinueButton)
            .click()
            .get(networkSelector)
            .click()
            .then(() => {
                cy.get(testnetNetworkOption).click();
            })
            .get(accountIdInput)
            .type(genesisAccount)
            .then(() => {
                cy.get(accountIdContinueButton).click();
            });
        cy.wait(500);
        cy.get(".error").its("text").should("be", error);
        cy.url().should("include", "access-my-account");
    });

    it("Can't access by Private Key", () => {
        const { KEY_PRIVATE_KEY } = Cypress.env();

        cy
            .get(softwareTile)
            .click()
            .get(privateKeyOption)
            .click()
            .get(accessContinueButton)
            .click()
            .get(privateKeyInput)
            .type(KEY_PRIVATE_KEY)
            .then(() => {
                cy.get(privateKeyContinueButton).click();
            })
            .get(networkSelector)
            .click()
            .then(() => {
                cy.get(testnetNetworkOption).click();
            })
            .get(accountIdInput)
            .type(genesisAccount)
            .then(() => {
                cy.get(accountIdContinueButton).click();
            });
        cy.wait(500);
        cy.get(".error").its("text").should("be", error);
        cy.url().should("include", "access-my-account");
    });
});
