/* eslint-disable promise/no-nesting, promise/always-return, promise/catch-or-return */
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

import { Ed25519PrivateKey } from "@hashgraph/sdk";

describe("Interface", () => {
    const menuButton = ".interface-form-title-container > button[type=submit]";
    const filesHeader = ":nth-child(2) > .nav-section-header > .nav-title";

    const { FILE_DL_ID } = Cypress.env();

    beforeEach(() => {
        cy.viewport("ipad-2");
        cy.visit("/").wait(1000).login().wait(100)
    });


    it("can navigate to download file through the menus, and use it", () => {
        cy.get(menuButton)
            .click()
            .get(filesHeader)
            .click()
            .get("a[href='/interface/download-file']")
            .click()
            .wait(100)
            .then(() => {
                cy.url().should("include", "/interface/download-file");
            });

        cy.get("input[placeholder='shard.realm.file']")
            .type(FILE_DL_ID)
            .get("div.download-container > button[type=submit]")
            .click()
            .get("div.buttons > button:last-of-type")
            .click()
            .get("div.button-container > button:first-of-type")
            .click();
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
                        reader.readAsText(blob);
                    }
                });
                xhr.send();
            })
        ).should("eq", "( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)")
            .get("div.button-container > button:last-of-type")
            .should("not.be.disabled")
            .click();
    });


    it("can export a Keystore", () => {
        const firstInput = ".password-with-confirm > :nth-child(1) > .label-container > .input-container > .input-wrapper > .flex-container > .text-flex-item > input";
        const secondInput = ".password-with-confirm > :nth-child(2) > .label-container > .input-container > .input-wrapper > .flex-container > .text-flex-item > input";
        const password = "horse are starting to take action...";

        cy
            .get(".export-keystore-icon")
            .click()
            .get(firstInput)
            .type(password)
            .get(secondInput)
            .type(password)
            .get(".btn-container > .btn")
            .click()
            .get(".download")
            .click();
        
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
                    password
                );
                assert(true, "Successfully downloaded Keystore and checked Private key from Keystore");
            } catch {
                assert(false, "Unable to download Keystore and generate Private Key");
            }
        });
    });
});
