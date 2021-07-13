describe("Marketing", () => {
  beforeEach(() => cy.viewport("macbook-13"));

  it("renders home", () => {
    cy.visit("/").contains("The #1");
    cy.get('[alt="man at computer"]').should("be.visible");
  });

  it("can view privacy policy", () => {
    cy
      .visit("/")
      .get("footer")
      .scrollIntoView()
      .get('[data-cy-link-privacy]')
      .click()
      .get('[data-cy-policy-header]')
      .contains('Privacy Policy');
  });

  it("can view terms and conditions", () => {
    cy
      .visit("/")
      .get("footer")
      .scrollIntoView()
      .get('[data-cy-link-terms]')
      .click()
      .get('[data-cy-terms-title')
      .contains('Terms and Conditions');
  });
});