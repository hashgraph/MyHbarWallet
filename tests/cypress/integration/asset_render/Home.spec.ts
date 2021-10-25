describe("Asset Render on Homepage", () => {
    beforeEach(() => cy.viewport("macbook-13"));

    it("can see assets on homepage", () => {
        // From homepage,
        cy.visit("/")

            // check if 'man at computer' image rendered
            .get('[alt="man at computer"]')
            .should("be.visible")

            // check if 'hbar wallet' image rendered
            .get('[alt="hbar wallet"]')
            .should("be.visible")

            // check if feature images rendered
            .get('[alt="hbdar tab"]')
            .should("be.visible")

            // check if FAQ image rendered
            .get('[alt="questions"]')
            .should("be.visible");
    });
});
