/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable promise/catch-or-return */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// eslint-disable @typescript/interface-name
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable<Subject> {
            login(): Chainable<Window>;
            snapshot(): Chainable<Window>;
        }
    }
}

import { LoginMethod } from "../../../src/domain/wallets/wallet";
import SoftwareWallet from "../../../src/domain/wallets/software";
import { availableNetworks } from "../../../src/domain/network";
import "cypress-file-upload";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getStore = () => cy.window().its("vueapp.$store");

Cypress.Commands.add("login", () => {
    const {
        KEY_ACCOUNT_ID,
        KEY_PUBLIC_KEY,
        KEY_PRIVATE_KEY
    } = Cypress.env();

    const wallet = new SoftwareWallet(
        LoginMethod.PrivateKey,
        KEY_PRIVATE_KEY,
        KEY_PUBLIC_KEY
    );

    const network = availableNetworks[ "network.testnet" ];

    getStore().its("actions").invoke("logIn",
        KEY_ACCOUNT_ID,
        wallet,
        network
    );
    return getStore().its("mutations").invoke("navigateToInterface");
});

export default {}; // Makes this file into a module (which can be imported)
