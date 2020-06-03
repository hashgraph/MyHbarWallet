/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

describe("Static", () => {
    beforeEach(() => cy.viewport("macbook-13"));

    it("can visit Home", () => {
        cy.visit("/");
    });

    it("can visit About", () => {
        cy.visit("/#about");
    });

    it("can visit FAQs", () => {
        cy.visit("/#faqs");
    });

    // Currently, netlify-plugin-cypress does not support redirects of any kind
    // So, navigating to pages other than / will not work

    // it("can visit Terms & Conditions", () => {
    //     cy.visit("/terms-and-conditions");
    // });

    // it("can visit Privacy Policy", () => {
    //     cy.visit("/privacy-policy");
    // });

    // it("can visit Hardware Wallet Affiliates", () => {
    //     cy.visit("/hardware-wallet-affiliates");
    // });

    // it("can visit Convert Units", () => {
    //     cy.visit("/convert-units");
    // });

    it("can Convert Units", () => {
        const unitsButton = ":nth-child(1) > :nth-child(2) > .link";
        const leftSelect = ".block-left > .select-block > .select > .select-value-container";
        const hbarOption = ".block-left > .select-block > .select > .select-menu > :nth-child(4)";
        const tinybarOption = ".block-right > .select-block > .select > .select-menu > :nth-child(1)";
        const rightSelect = ".block-right > .select-block > .select > .select-value-container";
        const leftInput = ".block-left > .input-block > .text-input > .label-container > .input-container > .input-wrapper > .flex-container > .text-flex-item > input";
        const rightInput = ".block-right > .input-block > .text-input > .label-container > .input-container > .input-wrapper > .flex-container > .text-flex-item > input";

        cy.visit("/")
            .get(unitsButton)
            .click()
            .then(() => {
                cy
                    .get(leftSelect)
                    .click()
                    .then(() => {
                        cy
                            .get(hbarOption)
                            .click();
                    });

                cy
                    .get(rightSelect)
                    .click()
                    .then(() => {
                        cy
                            .get(tinybarOption)
                            .click();
                    });

                cy
                    .get(leftInput)
                    .clear()
                    .type("383742920240539234872939")
                    .then(() => {
                        cy
                            .get(rightInput)
                            .type("12345");
                    })
                    .then(() => {
                        cy
                            .get(leftInput)
                            .should("have.value", "38374292024053923487293900000.00012345");
                    });
            });
    });

    it("can navigate to Privacy Policy from Home", () => {
        cy.visit("/")
            .get("[href='/privacy-policy']")
            .click()
            .then(() => {
                cy.url().should("include", "privacy-policy");
            });
    });

    it("can navigate to Terms & Conditions from Home", () => {
        cy.visit("/")
            .get("[href='/terms-and-conditions']")
            .click()
            .then(() => {
                cy.url().should("include", "terms-and-conditions");
            });
    });

    it("can navigate to Access My Account from Home", () => {
        cy.visit("/")
            .get(".tile-grid > [href='/access-my-account']")
            .click()
            .then(() => {
                cy.url().should("include", "access-my-account");
            });
    });

    it("can navigate to Create Account from Home", () => {
        cy.visit("/")
            .get(".tile-grid > [href='/create-account']")
            .click()
            .then(() => {
                cy.url().should("include", "create-account");
            });
    });

    it("can request Customer Service", () => {
        cy.visit("/");

        cy.window().then((win) => {
            cy.stub(win, "open").as("windowOpen");
        });

        cy.get(".customer-service")
            .click()
            .then(() => {
                cy.get(".text-area").type("E2E Testing");
                cy.get(".send-button").click();
            });

        cy.get("@windowOpen")
            .should("be.calledOnce")
            .and("be.calledWithMatch", /mailto:support@myhbarwallet.com*/);
    });
});
