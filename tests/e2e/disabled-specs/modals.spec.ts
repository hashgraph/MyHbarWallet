/// <reference types="cypress" />

import {
    accessContinueButton,
    accountIdContinueButton,
    accountIdInput,
    networkSelector,
    privateKeyContinueButton,
    privateKeyInput,
    privateKeyOption,
    softwareTile,
    testnetNetworkOption
} from "../fixtures/access";

describe("Modals", () => {
    beforeEach(() => {
        cy.viewport("macbook-13");
        cy.visit("/").get(".tile-grid > [href='/access-my-account']").click();
    });

    it("modals block scrolling on open and keep that state throughout the login flow", () => {
        const {
            KEY_ACCOUNT_ID,
            KEY_PRIVATE_KEY
        } = Cypress.env();

        cy.get(softwareTile).click();
        cy.get("body").should("have.class", "modal-is-open");
        cy
            .get(privateKeyOption)
            .click()            
            .get(accessContinueButton)
            .click();
        cy.get("body").should("have.class", "modal-is-open");
        cy
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
        cy  
            .get(accountIdInput)
            .type(KEY_ACCOUNT_ID)
            .then(() => {
                cy.get(accountIdContinueButton).click();
            });
        cy.wait(1000);
        cy.url().should("include", "interface");
        cy.get("body").should("not.have.class", "modal-is-open");
    });

    it("modals block scrolling on open and lose that state on close", () => {
        cy.get(softwareTile).click();
        cy.get("body").should("have.class", "modal-is-open");
        cy.get("svg.close").click()
        cy.get("body").should("not.have.class", "modal-is-open");
    });

});