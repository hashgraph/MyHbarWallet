/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

// Note: Netlify cannot currently parse JSON arrays (however they are specified)
// Therefore, we use comma-separated strings for arrays

describe("Create a New Account", () => {
    const menuButton = ".interface-form-title-container > button[type=submit]";
    
    beforeEach(() => {
        cy.viewport("ipad-2");
        cy.visit("/");
        cy.login();
    });

    it("can create a new account using its own public key", () => {
        cy
            .get(".key-icon")
            .click()
            .get(".public > .button")
            .click()
            .get("header > .close")
            .click()
            .get(menuButton)
            .click().wait(1000)
            .get("a[href='/interface/create-account']")
            .click()
            .get("div.form-main > div.text-input.has-suffix")
            .click()
            .type("1")
            .get("div.form-main > div.text-input:last-of-type")
            .click()
            // Cypress doesn't have Copy Paste as of 4.5.1
            //
            // .paste()
            // .get(".form-footer > button")
            // .click()
            // .wait(100)
            // .get("div.buttons > button:last-of-type")
            // .click()
            // .wait(2000)
            // .get("div.button-container > button.copy-button")
            // .click()
            // .get("div.button-container > button.dismiss-button")
            // .should("not.be.disabled")
            // .click();
    });
});