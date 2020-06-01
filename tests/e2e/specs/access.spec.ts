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
import { Ed25519PrivateKey } from '@hashgraph/sdk';

// Note: Netlify cannot currently parse JSON arrays (however they are specified)
// Therefore, we use comma-separated strings for arrays

describe("Access My Account", () => {
    
    beforeEach(() => {
        cy.viewport("ipad-2");
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
            });
        cy.wait(1000);
        cy.url().should("include", "interface");
    });

    it("Can access by Mnemonic Phrase (24 Words)", () => {
        const {
            MNEMONIC_ACCOUNT_ID,
            MNEMONIC_PHRASE
        } = Cypress.env();

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
            .type(MNEMONIC_ACCOUNT_ID)
            .then(() => {
                cy.get(accountIdContinueButton).click();
            });
        cy.wait(1000);
        cy.url().should("include", "interface");
    });

    it("Can access by Mnemonic Phrase (22 Words)", () => {
        const {
            MNEMONICL_ACCOUNT_ID,
            MNEMONICL_PHRASE
        } = Cypress.env();

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
            .type(MNEMONICL_ACCOUNT_ID)
            .then(() => {
                cy.get(accountIdContinueButton).click();
            });
        cy.wait(1000);
        cy.url().should("include", "interface");
    });

    it("Can access by Mnemonic Phrase with Password", () => {
        const {
            MNEMONICP_ACCOUNT_ID,
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
            .type(MNEMONICP_ACCOUNT_ID)
            .then(() => {
                cy.get(accountIdContinueButton).click();
            });
        cy.wait(1000);
        cy.url().should("include", "interface");
    });

    it("Can access by Private Key (Prefixed)", () => {
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
            });
        cy.wait(1000);
        cy.url().should("include", "interface");
    });

    it("Can access by Private Key (Unprefixed)", () => {
        const {
            KEY_ACCOUNT_ID,
            KEY_PRIVATE_KEY
        } = Cypress.env();

        const key = Ed25519PrivateKey.fromString(KEY_PRIVATE_KEY);
        const KEY_PRIVATE_KEY_UNPREFIXED = key.toString(true);  // true = no prefix

        cy
            .get(softwareTile)
            .click()
            .get(privateKeyOption)
            .click()
            .get(accessContinueButton)
            .click()
            .get(privateKeyInput)
            .type(KEY_PRIVATE_KEY_UNPREFIXED)
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
            });
        cy.wait(1000);
        cy.url().should("include", "interface");
    });
});
