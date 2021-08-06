import { PrivateKey } from "@hashgraph/sdk";
import { generate } from "generate-password";

let privateKey: PrivateKey | null = null;

describe("Keystore Create", () => {
    beforeEach(() => {
        cy.viewport("macbook-13");
        // Generate password
        cy.wrap(generate({ numbers: true })).as("password");
    });

    it("can create and download a keystore file", function () {
        // show password to log
        cy.log('password', this.password);

        // from homepage
        cy.visit("/")
            // Click on 'Create Wallet' button
            .get("[data-cy-create-link]")
            .click()

            // Click on 'Software' button
            .get("[data-cy-option]")
            .contains("Software")
            .click()

            // Click on 'Keystore Phrase' button
            .get("[data-cy-option")
            .contains("Keystore")
            .click()

            // Enter password
            .get("input[data-cy-pass-input]")
            .type(this.password)

            // Confirm password
            .get("input[data-cy-pass-confirm]")
            .type(this.password)

            // Click on 'Continue'
            .get("[data-cy-keystore-submit]")
            .click()
        cy.window().its("$router").invoke("push", { name: "access.software.keystore" });

        cy.readFile("cypress/downloads/keystore.txt", { timeout: 3000 }).then(async (file) => {
            const encoder = new TextEncoder();
            const keystore = encoder.encode(file);
            privateKey = await PrivateKey.fromKeystore(keystore, this.password);
        }).then(() => {
            cy.visit("/")
                .get("[data-cy-network-selector]")
                .filter(":visible")
                .click()
                .then(() => {
                    cy.get("[data-cy-option]")
                        .contains("testnet")
                        .filter(":visible")
                        .click();
                })
                .get("[data-cy-access-link]")
                .filter(":visible")
                .click()
                .get("[data-cy-option]")
                .contains("Software")
                .filter(":visible")
                .click()
                .get("[data-cy-option]")
                .contains("Private")
                .filter(":visible")
                .click()
                .get("[data-cy-key-input] input")
                .type(privateKey?.toString() ?? "")
                .get("[data-cy-key-submit]")
                .click()
                //Check QR code exists
                .get("[data-cy-qr-code]")
                .should("exist")
                .and("be.visible")

                .then(() => {
                    // Check that public key under QR code is visible
                    cy
                        .get("[data-cy-public-key]")
                        .should("exist")
                        .and("be.visible")
                        .invoke("text")

                        // and matches expected public key
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        .should("equal", (privateKey! as PrivateKey).publicKey.toString().slice(24))
                });
        })
    })

})
