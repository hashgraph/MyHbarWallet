/// <reference types="cypress"/>

Cypress.Commands.add("vue", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return cy.wrap(Cypress.vueWrapper);
})