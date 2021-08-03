describe("Tool: Associate Token", () => {
    const {
      KEY_PRIVATE_KEY,
      KEY_ACCOUNT_ID
    } = Cypress.env();
  
    beforeEach(() => {
      cy.viewport("macbook-13");
      
      // Login with Testnet credentials
      cy.visit("/");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cy.login(KEY_PRIVATE_KEY, KEY_ACCOUNT_ID);
      
      // Navigate from Home to Tool: Associate Token
      cy
        .get("[data-cy-tools]")
        .filter(":visible")
        .click()
        .get("[data-cy-tool-associate]")
        .filter(":visible")
        .click();
    });

    it("can associate a token", () => {
      cy.log("TODO: Create and associate a token");
    });

    it("can identify an already associated token", () => {
      cy.log("TODO: Try to associate an already associated token");
    });

    it("can identify a token that requires KYC", () => {
      cy.log("TODO: Try to associate a token that requires KYC");
    })
  });
  