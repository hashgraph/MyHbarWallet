/// <reference types="cypress"/>

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
    interface Chainable {
        login(): void;
        vue(): void;
    }
}

Cypress.Commands.add("vue", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return cy.wrap(Cypress.vueWrapper);
});

Cypress.Commands.add("login", (privateKey: string, accountId: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.window().its("$store").invoke("login", privateKey, accountId);
    cy.window().its("$router").invoke("push", { name: "home" });
});
