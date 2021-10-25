describe("Asset Render on Access View", () => {
    beforeEach(() => cy.viewport("macbook-13"));

    it("can see assets on access pages", () => {
        // From access page,
        cy.visit("/create")

            // check if Software image rendered
            .get('[data-cy-option="Software.title"] img')
            .should("be.visible")

                // route into access/software view
                .get('[data-cy-option="Software.title"]')
                .click()

                    // check if Keystore File image rendered
                    .get('[data-cy-option="Keystore.title"] img')
                    .should("be.visible")

                    // check if Mnemonic Phrase image rendered
                    .get('[data-cy-option="Mnemonic.title"] img')
                    .should("be.visible")

                    // check if Private Key image rendered
                    .get('[data-cy-option="Key.title"] img')
                    .should("be.visible")

                    // route back to access page
                    .get('[alt="green arrow"]')
                    .click()

            // check if Hardware image rendered
            .get('[data-cy-option="Hardware.title"] img')
            .should("be.visible")

                // route into access/hardware view
                .get('[data-cy-option="Hardware.title"]')
                .click()

                    // check if Ledger image rendered
                    .get('[data-cy-option="ledger"] img')
                    .should("be.visible")
    });
});
