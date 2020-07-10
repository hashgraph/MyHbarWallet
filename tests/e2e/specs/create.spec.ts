/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

import { Ed25519PrivateKey } from "@hashgraph/sdk";

const softwareSelectButton = ".modal-access-by-software > button";

describe("Create An Account", () => {

    beforeEach(() => {
        cy.viewport("ipad-2");
        cy.visit("/").get(".tile-grid > [href='/create-account']").click();
        cy.url().should("include", "create-account");
    });

    const { KEYSTORE_PASSWORD, MNEMONICP_PASSWORD } = Cypress.env();

    it("can create an account With Keystore File", () => {
        cy.get(".tile-grid > :nth-child(2)")
            .click()
            .wait(1000)
            .get("label[for=file]")
            .click()
            .get(softwareSelectButton)
            .click()
            .wait(1000)
            .get(".text-flex-item > input")
            .first()
            .click()
            .type(KEYSTORE_PASSWORD)
            .get(".text-flex-item > input")
            .last()
            .click()
            .type(KEYSTORE_PASSWORD)
            .get("div.btn-container > button.btn")
            .click()
            .wait(1000)
            .get("div.button-container")
            .within(() => {
                cy.get("button.download-button").should("not.be.disabled").click();
            });
        cy.get("a[download]").then((anchor) =>
            new Cypress.Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", anchor.prop("href"), true);
                xhr.responseType = "blob";

                xhr.addEventListener("load", () => {
                    if (xhr.status === 200) {
                        const blob = xhr.response;
                        const reader = new FileReader();
                        reader.addEventListener("load", () => {
                            resolve(reader.result);
                        });
                        reader.readAsArrayBuffer(blob);
                    }
                });
                xhr.send();
            })
        ).then(async(key) => {
            try {
                Ed25519PrivateKey.fromKeystore(
                    key as Uint8Array,
                    KEYSTORE_PASSWORD
                );
                assert(true, "Successfully downloaded Keystore and checked Private key from Keystore");
            } catch {
                assert(false, "Unable to download Keystore and generate Private Key");
            }
        });
    });

    it("can create an account With Mnemonic Phrase, without password", () => {
        const mnemonicPhraseList: string[] = [];
        cy.get(".tile-grid > :nth-child(2)")
            .click()
            .wait(1000)
            .get("label[for=phrase]")
            .click()
            .get(softwareSelectButton)
            .click()
            .wait(1000);
        cy.get("label.list-item > input[type=text]").each(($el, __, _) => {
            console.log(($el[ 0 ] as HTMLInputElement).value);
            mnemonicPhraseList.push(($el[ 0 ] as HTMLInputElement).value);
        });
        cy.get("div.continue-btn-container >  button.continue-btn")
            .click()
            .wait(1000)
            .get("div.mnemonic > label")
            .each(($el, index, $list) => {
                if (!$el[ 0 ].classList.contains("readonly")) {
                    cy.wrap($el).click().type(mnemonicPhraseList[ index ]);
                }
            })
            .get("div.btn-container >  button[type=submit]")
            .click()
            .wait(1000)
            .get("div.buttons > button:last-of-type")
            .click()
            .wait(1000)
            .get("div.buttons > button:last-of-type")
            .should("be.disabled");
    });

    it("can create an account with Mnemonic Phrase, with password", () => {
        const mnemonicPhraseList: string[] = [];
        cy.get(".tile-grid > :nth-child(2)")
            .click()
            .wait(1000)
            .get("label[for=phrase]")
            .click()
            .get(softwareSelectButton)
            .click()
            .wait(1000);
        cy.get("label.list-item > input[type=text]").each(($el, __, _) => {
            console.log(($el[ 0 ] as HTMLInputElement).value);
            mnemonicPhraseList.push(($el[ 0 ] as HTMLInputElement).value);
        });
        cy.get("span.thumb")
            .click()
            .get("div.password-with-confirm > div.text-input")
            .first()
            .type(MNEMONICP_PASSWORD)
            .get("div.password-with-confirm > div.text-input")
            .last()
            .type(MNEMONICP_PASSWORD)
            .get("div.continue-btn-container >  button.continue-btn")
            .click()
            .wait(1000)
            .get("div.mnemonic > label")
            // eslint-disable-next-line sonarjs/no-identical-functions
            .each(($el, index, $list) => {
                if (!$el[ 0 ].classList.contains("readonly")) {
                    cy.wrap($el).click().type(mnemonicPhraseList[ index ]);
                }
            })
            .get("span.thumb")
            .last()
            .click()
            .get("div.password-input > div.text-input")
            .first()
            .type(MNEMONICP_PASSWORD)
            .get("div.btn-container >  button[type=submit]")
            .scrollIntoView()
            .click()
            .wait(1000)
            .get("div.buttons > button:last-of-type")
            .click()
            .wait(1000)
            .get("div.buttons > button:last-of-type")
            .should("be.disabled");
    });
});
