describe("Marketing", () => {
  beforeEach(() => cy.viewport("macbook-13"));

  it("renders home", () => {
    cy.visit("/").contains("The #1");
    cy.get('[alt="man at computer"]').should("be.visible");
  });
});
