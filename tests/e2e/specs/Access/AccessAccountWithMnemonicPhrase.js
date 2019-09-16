const mnemonicPhrase =
    "neither\ttheory\tnature\tsad\taim\tthree\tstaff\tinsane\torchard\tuse\tvote\tcherry\tmiss\tpalace\tpitch\televator\tfloat\tbuyer\tcitizen\tgossip\tscissors\ttobacco\tglue\tdigital\n";
const mnemonicPhraseAccountId = "0.0.62519";
const mnemonicPhrasePublicKey =
    "302a300506032b657003210052a5df220ff49beeaf86704193afefa08cffb4212a6d0937e55e2e4f5bc4488e";

module.exports = {
    "it can access account with mnemonic phrase": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .click(".home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .click(".account-tile-button:not(.disabled):nth-child(2)")
            .waitForElementVisible("label[for=phrase]", 5000)
            .click("label[for=phrase]")
            .click(".modal-access-by-software > button:nth-child(3)")
            .waitForElementVisible(
                ".modal-mnemonic-phrase > .modal-background.is-open > .modal",
                5000
            )
            .waitForElementVisible(
                ".modal-mnemonic-phrase > .modal-background.is-open > .modal .list-item",
                5000
            )
            .setValue(
                ".modal-mnemonic-phrase > .modal-background.is-open > .modal .list-item > .word",
                mnemonicPhrase + "\n"
            )
            .waitForElementVisible(
                "input[placeholder='shard.realm.account'",
                5000
            )
            .setValue(
                "input[placeholder='shard.realm.account'",
                mnemonicPhraseAccountId
            )
            .click("div.buttons:nth-child(2) > button:nth-child(2)")
            .waitForElementVisible(".interface-form", 10000)
            .waitForElementVisible(".interface .balance .hbar-balance", 10000)
            .assert.urlContains("interface/send-transfer")
            .assert.containsText(".account .subtitle", mnemonicPhraseAccountId);
    },

    "it can view balance information": browser => {
        browser.expect
            .element(".interface .balance .hbar-balance")
            .text.to.match(
                /^([1-9]\d{0,2}(?:,\d{3})*(\.\d{1,9})?|0?\.(?=.*[1-9])\d{1,9}) ℏ$/
            );
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
                mnemonicPhrasePublicKey
            )
            .moveTo("div.modal-background")
            .mouseButtonDown()
            .mouseButtonUp();
    },

    "it can view account id modal": browser => {
        browser
            .click(".qr-icon")
            .waitForElementVisible(".pub-qr > canvas:nth-child(1)", 5000)
            .assert.containsText(".account-id .value", mnemonicPhraseAccountId)
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
