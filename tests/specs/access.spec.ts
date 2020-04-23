/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

const softwareTile = ".tile-grid > :nth-child(2)";
const mnemonicPhraseOption = ":nth-child(2) > .radio-button";
const privateKeyOption = ":nth-child(3) > .radio-button";
const keystoreOption = ":nth-child(1) > .radio-button";
const hiddenFileInput = "#file-upload";
const keystorePasswordInput = ".text-flex-item > input";
const keystorePasswordBtn = "form > .btn";
const accessContinueButton = ".modal-access-by-software > button";
const mnemonicToggle = ".toggle > .switch-button > .thumb";
const mnemonicInput = (index: string): string => `:nth-child(${index}) > .word`;
const mnemonicPasswordToggle = ".password-switch > .switch-button > .thumb";
const mnemonicPasswordInput = ".text-flex-item > input";
const mnemonicContinueButton = ".continue-btn";
const privateKeyInput = ".text-flex-item > input";
const privateKeyContinueButton = ".button-access-wallet";
const networkSelector = ".select-value";
const testnetNetworkOption = ".select-menu > :nth-child(2)";
const accountIdInput = ":nth-child(3) > .text-input > .label-container > .input-container > .input-wrapper > .flex-container > .text-flex-item > input";
const accountIdContinueButton = ".buttons > [type='submit']";

describe("Access My Account", () => {
    beforeEach(() => {
        cy.visit("/").get(".tile-grid > [href='/access-my-account']").click();
        cy.url().should("include", "access-my-account");
    });

    it("Can access by Keystore", () => {
        const {
            KEYSTORE_ACCOUNT_ID,
            KEYSTORE_PASSWORD
        } = Cypress.env();

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
            .type(KEYSTORE_ACCOUNT_ID)
            .then(() => {
                cy.get(accountIdContinueButton).click();
            })
            .wait(100);
        cy.url().should("contain", "interface");
    });

    it("Can access by Mnemonic Phrase", () => {
        const {
            MNEMONIC_ACCOUNT_ID,
            MNEMONIC_PHRASE
        } = Cypress.env();

        cy
            .get(softwareTile)
            .click()
            .get(mnemonicPhraseOption)
            .click()
            .get(accessContinueButton)
            .click()
            .then(() => {
                for (let i = 1; i < 25; i++) {
                    cy.get(mnemonicInput(i.toString())).type(MNEMONIC_PHRASE[ i - 1 ]);
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
            .type(MNEMONIC_ACCOUNT_ID)
            .then(() => {
                cy.get(accountIdContinueButton).click();
            })
            .wait(100);
        cy.url().should("contain", "interface");
    });

    it("Can access by Mnemonic Phrase (Legacy)", () => {
        const {
            MNEMONICL_ACCOUNT_ID,
            MNEMONICL_PHRASE
        } = Cypress.env();

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
                    cy.get(mnemonicInput(i.toString())).type(MNEMONICL_PHRASE[ i - 1 ]);
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
            .type(MNEMONICL_ACCOUNT_ID)
            .then(() => {
                cy.get(accountIdContinueButton).click();
            })
            .wait(100);
        cy.url().should("contain", "interface");
    });

    it("Can access by Mnemonic Phrase with Password", () => {
        const {
            MNEMONICP_ACCOUNT_ID,
            MNEMONICP_PHRASE,
            MNEMONICP_PASSWORD
        } = Cypress.env();

        cy
            .get(softwareTile)
            .click()
            .get(mnemonicPhraseOption)
            .click()
            .get(accessContinueButton)
            .click()
            .then(() => {
                for (let i = 1; i < 25; i++) {
                    cy.get(mnemonicInput(i.toString())).type(MNEMONICP_PHRASE[ i - 1 ]);
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
            .type(MNEMONICP_ACCOUNT_ID)
            .then(() => {
                cy.get(accountIdContinueButton).click();
            })
            .wait(100);
        cy.url().should("contain", "interface");
    });

    it("Can access by Private Key", () => {
        const {
            KEY_ACCOUNT_ID,
            KEY_PRIVATE_KEY
        } = Cypress.env();

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
            .type(KEY_ACCOUNT_ID)
            .then(() => {
                cy.get(accountIdContinueButton).click();
            })
            .wait(100);
        cy.url().should("contain", "interface");
    });
});
