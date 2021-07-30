describe("Private Key Create", ()=>{
    const PUBLIC_KEY_LENGTH = 64;

    beforeEach( ()=> cy.viewport("macbook-13"));
    
    it("can create wallet with private key", async ()=>{

        let privateKey = "";

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
                cy.get("input").then( (generatedPrivateKey) => {
                    privateKey = generatedPrivateKey[0].value;
                });
                setTimeout(5000);
            })

            //Wait getting privateKey input is done before continuing

            .then(()=> {

            //Click "Continue"
            
                cy.get("button")
                .contains("Continue")
                .click()
            
                //Check QR code exists

                .get("[data-cy-qr-code]")
                .should("exist")
                .and("be.visible")

                //Check public key exists

                .get("[data-cy-public-key]")
                .should("exist")
                .and("be.visible")
                .invoke("text")
                .should("have.length", privateKey.length);
            });
    });
});