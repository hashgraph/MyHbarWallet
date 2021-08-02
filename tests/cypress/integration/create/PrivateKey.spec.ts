import { PrivateKey } from "@hashgraph/sdk";

describe("Private Key Create", ()=>{
    const PUBLIC_KEY_LENGTH = 64;

    beforeEach(()=> cy.viewport("macbook-13"));
    
    it("can create wallet with private key", async ()=>{

        let privateKey: PrivateKey | null = null;

        cy.visit("/")

            //Click "Create Wallet" button
            .get("[data-cy-create-link]")
            .click()
            
            //Click "Software"
            .get("[data-cy-option]")
            .contains("Software")
            .click()

            //Click "Private Key"

            .get("[data-cy-option]")
            .contains("Private Key")
            .click()

            //Get Private Key
            .then(()=> {
                cy.get("input").then((generatedPrivateKey) => {
                    privateKey = PrivateKey.fromString(generatedPrivateKey[0].value);
                });
            })

            //Click "Continue"
            .get("button")
            .contains("Continue")
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

                // and is of proper length
                .invoke("text")
                .should("have.length", PUBLIC_KEY_LENGTH)

                // and matches expected public key
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                .should("equal", (privateKey! as PrivateKey).publicKey.toString().slice(24))
            });
    });
});