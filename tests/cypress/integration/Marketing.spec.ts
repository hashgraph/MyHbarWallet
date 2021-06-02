describe("Marketing", () => {
  beforeEach(() => cy.viewport("macbook-13"));

  it("renders home", () => {
    cy.visit("/").contains("The #1");
    cy.get('[alt="man at computer"]').should("be.visible");
  });

  it("can select a network", () => {
    cy.get("[data-cy-network-selector]")
      .filter(":visible")
      .click()
      .then(() => {
        cy.get("[data-cy-option]")
          .contains("Testnet")
          .filter(":visible")
          .click();
      });
  });

  it("navigates to about", () => {
    cy.visit("/").intercept("GET", "/#about", {
      statusCode: 200,
    });
    cy.contains("About MyHbarWallet");
    cy.get('[alt="hbar wallet"]').should("be.visible");
  });

  it("navigates to faqs", () => {
    cy.visit("/").intercept("GET", "/#faq", {
      statusCode: 200,
    });
    cy.contains("Answers to most frequently asked questions");
    cy.get('[alt="questions"]').should("be.visible");
  });

  it("navigates to access wallet", () => {
    cy.visit("/").intercept("GET", "/access", {
      statusCode: 200,
    });
  });

  it("navigates to create wallet", () => {
    cy.visit("/").intercept("GET", "/create", {
      statusCode: 200,
    });
  });

  it("navigates to privacy policy", () => {
    cy.visit("/").intercept("GET", "/privacy-policy", {
      statusCode: 200,
    });
  });

  it("navigates to terms and conditions", () => {
    cy.visit("/").intercept("GET", "/terms-and-conditions", {
      statusCode: 200,
    });
  });
});
