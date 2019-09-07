const privateKey =
    "302e020100300506032b657004220420b47720552ad89bafe97676da89cef818d8d888fe4eeba62135facfbd35e60e88";
const publicKey =
    "302a300506032b65700321000399267b48ccbac3f03278f6fd96fce1c71a00db692d75f8f82814f85a8cf74e";
const accountId = "0.0.45507";

module.exports = {
    "it can access account by private key": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .click(".home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .click(".account-tile-button:nth-child(2)")
            .waitForElementVisible("label[for=key]", 5000)
            .click("label[for=key]")
            .click(".modal-access-by-software > button:nth-child(3)")
            .waitForElementVisible(
                "input[placeholder='Enter Private Key']",
                5000
            )
            .setValue("input[placeholder='Enter Private Key']", privateKey)
            .click(".button-access-wallet")
            .waitForElementVisible(
                "input[placeholder='shard.realm.account'",
                5000
            )
            .setValue("input[placeholder='shard.realm.account'", accountId)
            .click("div.buttons:nth-child(2) > button:nth-child(2)")
            .waitForElementVisible(
                ".account > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)",
                5000
            );
    },

    "it can see accurate Account Id": browser => {
        // todo: fix this when 0.0. prefixes change?
        browser.assert.containsText(
            ".account > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > strong:nth-child(2)",
            accountId.substr(accountId.lastIndexOf(".") + 1)
        );
    },

    "it can see non-zero hbar balance in wallet": browser => {
        browser.expect
            .element(".interface .balance .hbar-balance")
            .text.to.match(
                /^([1-9]\d{0,2}(?:,\d{3})*(\.\d{1,9})?|0?\.(?=.*[1-9])\d{1,9}) ℏ$/
            );
    },

    "it can see non-zero USD balance in wallet": browser => {
        browser.expect
            .element(".interface .balance .usd-balance")
            .text.to.match(
                /^\$([1-9]\d{0,2}(,\d{3})*(\.\d{2})?|[1-9]\d*(\.\d{2})?|0?\.(?!00)\d{2})$/
            );
    },

    "it can view public key modal": browser => {
        browser
            .click(".copy-icon > path:nth-child(1)")
            .waitForElementVisible(
                "div.read-only-input:nth-child(1) > div:nth-child(1)",
                5000
            )
            .assert.containsText(
                "div.read-only-input:nth-child(1) > div:nth-child(1)",
                publicKey
            )
            .moveTo("div.modal-background")
            .mouseButtonDown()
            .mouseButtonUp();
    },

    "it can view account id modal": browser => {
        browser
            .click(".qr-icon")
            .waitForElementVisible(".pub-qr > canvas:nth-child(1)", 5000)
            .assert.containsText(".value", accountId)
            .moveTo("div.modal-background")
            .mouseButtonDown()
            .mouseButtonUp();
    },

    "it can see log out at home": browser => {
        browser
            .click("div.links:nth-child(3) > a:nth-child(1)")
            .waitForElementVisible(".home-tile-button", 10000)
            .expect.element("div.modal-background:nth-child(6)")
            .to.have.attribute("class")
            .which.contains("is-open");

        browser.end();
    }
};
