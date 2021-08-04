import { PrivateKey, Mnemonic } from "@hashgraph/sdk";

describe("Mnemonic Create", () => {
    const PUBLIC_KEY_LENGTH = 64;

    beforeEach(() => cy.viewport("macbook-13"));

    it("can create wallet with mnemonic phrase (24 words)", () => {
        const MNEMONIC24_PHRASE: string[] = [];
        let privateKey: PrivateKey | null = null;

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
                        MNEMONIC24_PHRASE.push(phrase.val()?.toString() ?? "");
                    });
                }
            })

            // Construct private key from generated words
            .then(async () => {
                privateKey = await (
                    await PrivateKey.fromMnemonic(
                        await Mnemonic.fromWords(MNEMONIC24_PHRASE)
                    )
                ).derive(0);
            })

            // Click on 'Submit' button
            .get("[type='submit']")
            .click()

            // Verify mnemonic phrase
            .then(() => {
                for (let i = 0; i < 24; i++) {
                    cy.get(`#mnemonic\\:${i + 1}`).type(MNEMONIC24_PHRASE[i]);
                }
            })
            
            // Click on 'Verify' button
            .get("[type='submit']")
            .click()

            // Check that QR code is visible
            .get("[data-cy-qr-code]")
            .should("exist")
            .and("be.visible")

            .then(() => {
                // Check that public key under QR code is visible
                cy
                    .get("[data-cy-public-key]")
                    .should("exist")
                    .and("be.visible")

                // and is of proper length
                .invoke("text")
                .should("have.length", PUBLIC_KEY_LENGTH)

                // and matches expected public key
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                .should("equal", (privateKey! as PrivateKey).publicKey.toString().slice(24))
            });
    });
});
