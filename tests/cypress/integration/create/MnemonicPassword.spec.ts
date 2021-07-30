import { generate } from "generate-password";

describe("Mnemonic Password Create", () => {
    const PUBLIC_KEY_LENGTH = 64;

    beforeEach(() => {
        cy.viewport("macbook-13");

        // Generate password
        cy.wrap(generate({ numbers: true })).as("password");
    });

    it("can create wallet with mnemonic phrase (24 words) and optional password", function () {
        const MNEMONIC24_PHRASE = [];

        // Show password to log
        cy.log(this.password);

        // From homepage,
        cy.visit("/")

            // Click on 'Create Wallet' button
            .get("[data-cy-create-link]")
            .click()

            // Click on 'Software' button
            .get("[data-cy-option]")
            .contains("Software")
            .click()

            // Click on 'Mnemonic Phrase' button
            .get("[data-cy-option")
            .contains("Mnemonic")
            .click()

            // Grab mnemonic phrase and push each phrase into MNEMONIC24_PHRASE
            .then(() => {
                for (let i = 0; i < 24; i++) {
                    cy.get(`#mnemonic\\:${i + 1}`).then((phrase) => {
                        MNEMONIC24_PHRASE.push(phrase.val());
                    });
                }
            })

            // Toggle Password switch
            .get("[data-cy-switch]")
            .click()

            // Enter password
            .get("input[data-cy-pass-input]")
            .type(this.password)

            // Confirm password
            .get("input[data-cy-pass-confirm]")
            .type(this.password)

            // Click on 'Submit' button
            .get("[type='submit']")
            .click()

            // Verify mnemonic phrase
            .then(() => {
                for (let i = 0; i < 24; i++) {
                    cy.get(`#mnemonic\\:${i + 1}`).type(MNEMONIC24_PHRASE[i]);
                }
            })

            // Verify password
            .get("input[data-cy-pass-input]")
            .type(this.password)

            // Click on 'Verify' button
            .get("[type='submit']")
            .click()

            // Check that QR code is visible
            .get("[data-cy-qr-code]")
            .should("exist")
            .and("be.visible")

            // Check that public key under QR code is visible
            .get("[data-cy-public-key]")
            .should("exist")
            .and("be.visible")

            // and is of proper length
            .invoke("text")
            .should("have.length", PUBLIC_KEY_LENGTH);
    });
});
