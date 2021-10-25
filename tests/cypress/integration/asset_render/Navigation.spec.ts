describe("Asset Render on Navigation Bar", () => {
    beforeEach(() => cy.viewport("macbook-13"));

    it("can see assets on nav bar", () => {
        // From homepage,
        cy.visit("/")

            // check if nav MyHbarWallet logo rendered
            .get('[alt="MyHbarWallet Logo"]')
            .should("be.visible")

            // open network select to expose list
            .get("[data-cy-network-selector]").first()
            .click()

                // check if all list items' Hedera logo rendered
                .get('[data-cy-option="mainnet"] img')
                .should("be.visible")

                .get('[data-cy-option="testnet"] img')
                .should("be.visible")

                .get('[data-cy-option="previewnet"] img')
                .should("be.visible")
    });
});
