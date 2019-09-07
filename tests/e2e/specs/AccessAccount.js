const mnemonicPhrase =
    "baby\tgrid\tbrain\tsight\tsunset\tdomain\tjoy\tgallery\tmaster\trenew\tassume\tpony\tpistol\torient\ttaxi\tbehave\tfrown\ttent\torchard\thungry\ttext\tpeace\tdivert\tinquiry";
// const mnemonicPhrase = "baby grid brain sight sunset domain joy gallery master renew assume pony pistol orient taxi behave frown tent orchard hungry text peace divert inquiry";
const mnemonicPhraseAccountId = "0.0.60122";
const keystoreFileAccountId = "0.0.60118";
const incorrectAccountId = "0.0.33";

module.exports = {
    "it can access account by keystore file": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .assert.containsText(
                "a.home-tile-button[href='/access-my-account']",
                "Access My Account"
            )
            .click("a.home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .assert.containsText(
                ".account-tile-button:nth-child(2) > .text > .title",
                "Software"
            )
            .click(".account-tile-button:nth-child(2)")
            .waitForElementVisible("label[for=file]", 5000)
            .assert.containsText("label[for=file]", "Keystore File")
            .click("label[for=file]")
            .click(
                ".modal-access-by-software > .modal-background.is-open > .modal button[type=submit]"
            )
            .setValue(
                "#file-upload",
                require("path").resolve(__dirname + "/../keystore_file")
            )
            .pause(1000)
            .waitForElementVisible(
                ".modal-password > .modal-background.is-open > .modal",
                5000
            )
            .waitForElementVisible(
                "input[placeholder='Please Enter At Least 9 Characters']",
                5000
            )
            .setValue(
                "input[placeholder='Please Enter At Least 9 Characters']",
                "ThisIsARandomPassword"
            )
            .click(
                ".modal-password > .modal-background.is-open > .modal button[type=submit]"
            )
            .waitForElementVisible(
                ".modal-enter-account-id > .modal-background.is-open > .modal",
                5000
            )
            .waitForElementVisible(
                "input[placeholder='shard.realm.account']",
                5000
            )
            .setValue("input[placeholder='shard.realm.account']", "0.0.60118")
            .click(
                ".modal-enter-account-id > .modal-background.is-open > .modal button[type=submit]"
            )
            .waitForElementVisible(".interface-form", 10000)
            .waitForElementVisible(".interface .balance .hbar-balance", 10000)
            .assert.urlContains("interface/send-transfer")
            .assert.containsText(".account .subtitle", keystoreFileAccountId);

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

        browser.end();
    },

    "it can access account by keystore file using the <enter> keypress to switch modals": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .assert.containsText(
                "a.home-tile-button[href='/access-my-account']",
                "Access My Account"
            )
            .click("a.home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .assert.containsText(
                ".account-tile-button:nth-child(2) > .text > .title",
                "Software"
            )
            .click(".account-tile-button:nth-child(2)")
            .waitForElementVisible("label[for=file]", 5000)
            .assert.containsText("label[for=file]", "Keystore File")
            .click("label[for=file]")
            .click(
                ".modal-access-by-software > .modal-background.is-open > .modal button[type=submit]"
            )
            .setValue(
                "#file-upload",
                require("path").resolve(__dirname + "/../keystore_file")
            )
            .pause(1000)
            .waitForElementVisible(
                ".modal-password > .modal-background.is-open > .modal",
                5000
            )
            .waitForElementVisible(
                "input[placeholder='Please Enter At Least 9 Characters']",
                5000
            )
            .setValue(
                "input[placeholder='Please Enter At Least 9 Characters']",
                "ThisIsARandomPassword\n"
            )
            .waitForElementVisible(
                ".modal-enter-account-id > .modal-background.is-open > .modal",
                5000
            )
            .waitForElementVisible(
                "input[placeholder='shard.realm.account']",
                5000
            )
            .setValue(
                "input[placeholder='shard.realm.account']",
                keystoreFileAccountId + "\n"
            )
            .waitForElementVisible(".interface-form", 10000)
            .assert.urlContains("interface/send-transfer")
            .end();
    },

    "it fails to access keystore file with incorrect password": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .assert.containsText(
                "a.home-tile-button[href='/access-my-account']",
                "Access My Account"
            )
            .click("a.home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .assert.containsText(
                ".account-tile-button:nth-child(2) > .text > .title",
                "Software"
            )
            .click(".account-tile-button:nth-child(2)")
            .waitForElementVisible("label[for=file]", 5000)
            .assert.containsText("label[for=file]", "Keystore File")
            .click("label[for=file]")
            .click(
                ".modal-access-by-software > .modal-background.is-open > .modal button[type=submit]"
            )
            .setValue(
                "#file-upload",
                require("path").resolve(__dirname + "/../keystore_file")
            )
            .pause(1000)
            .waitForElementVisible(
                ".modal-password > .modal-background.is-open > .modal",
                5000
            )
            .waitForElementVisible(
                "input[placeholder='Please Enter At Least 9 Characters']",
                5000
            )
            .setValue(
                "input[placeholder='Please Enter At Least 9 Characters']",
                "ThisIsAnIncorrectPassword\n"
            )
            .waitForElementVisible(
                ".modal-password > .modal-background.is-open > .modal .error",
                5000
            )
            .assert.containsText(
                ".modal-password > .modal-background.is-open > .modal .error",
                "Invalid password"
            )
            .end();
    },

    "it fails to access keystore file with invalid account id": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .assert.containsText(
                "a.home-tile-button[href='/access-my-account']",
                "Access My Account"
            )
            .click("a.home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .assert.containsText(
                ".account-tile-button:nth-child(2) > .text > .title",
                "Software"
            )
            .click(".account-tile-button:nth-child(2)")
            .waitForElementVisible("label[for=file]", 5000)
            .assert.containsText("label[for=file]", "Keystore File")
            .click("label[for=file]")
            .click(
                ".modal-access-by-software > .modal-background.is-open > .modal button[type=submit]"
            )
            .setValue(
                "#file-upload",
                require("path").resolve(__dirname + "/../keystore_file")
            )
            .pause(1000)
            .waitForElementVisible(
                ".modal-password > .modal-background.is-open > .modal",
                5000
            )
            .waitForElementVisible(
                "input[placeholder='Please Enter At Least 9 Characters']",
                5000
            )
            .setValue(
                "input[placeholder='Please Enter At Least 9 Characters']",
                "ThisIsARandomPassword\n"
            )
            .waitForElementVisible(
                ".modal-enter-account-id > .modal-background.is-open > .modal",
                5000
            )
            .waitForElementVisible(
                "input[placeholder='shard.realm.account']",
                5000
            )
            .setValue(
                "input[placeholder='shard.realm.account']",
                incorrectAccountId + "\n"
            )
            .waitForElementVisible(
                ".modal-enter-account-id > .modal-background.is-open > .modal .error",
                5000
            )
            .assert.containsText(
                ".modal-enter-account-id > .modal-background.is-open > .modal .error",
                "This account is not associated with your private key."
            )
            .end();
    },

    "it can get public key if an account hasn't been created": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .assert.containsText(
                "a.home-tile-button[href='/access-my-account']",
                "Access My Account"
            )
            .click("a.home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .assert.containsText(
                ".account-tile-button:nth-child(2) > .text > .title",
                "Software"
            )
            .click(".account-tile-button:nth-child(2)")
            .waitForElementVisible("label[for=file]", 5000)
            .assert.containsText("label[for=file]", "Keystore File")
            .click("label[for=file]")
            .click(
                ".modal-access-by-software > .modal-background.is-open > .modal button[type=submit]"
            )
            .setValue(
                "#file-upload",
                require("path").resolve(__dirname + "/../keystore_file")
            )
            .pause(1000)
            .waitForElementVisible(
                ".modal-password > .modal-background.is-open > .modal",
                5000
            )
            .waitForElementVisible(
                "input[placeholder='Please Enter At Least 9 Characters']",
                5000
            )
            .setValue(
                "input[placeholder='Please Enter At Least 9 Characters']",
                "ThisIsARandomPassword\n"
            )
            .waitForElementVisible(
                ".modal-enter-account-id > .modal-background.is-open > .modal",
                5000
            )
            .waitForElementVisible(
                "input[placeholder='shard.realm.account']",
                5000
            )
            .click(
                ".modal-enter-account-id > .modal-background.is-open > .modal button[type=button]"
            )
            .waitForElementVisible(
                ".modal-request-to-create-account > .modal-background.is-open > .modal",
                5000
            )
            .assert.containsText(
                ".modal-request-to-create-account > .modal-background.is-open > .modal .read-only-input",
                "302a300506032b6570032100389ac2dd5574527b37513463822bbee3869664b46421f0627a82d0c305728d4b"
            )
            .end();
    },

    // Public key: 302a300506032b6570032100eb41786160bc99eb44ab9bda7a0ab1174a38f3a784cf9d77d68bb66fe55c856
    // Account id: 0.0.60122
    "it can access account with mnemonic phrase": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .assert.containsText(
                "a.home-tile-button[href='/access-my-account']",
                "Access My Account"
            )
            .click("a.home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .assert.containsText(
                ".account-tile-button:nth-child(2) > .text > .title",
                "Software"
            )
            .click(".account-tile-button:nth-child(2)")
            .waitForElementVisible("label[for=phrase]", 5000)
            .assert.containsText("label[for=phrase]", "Mnemonic Phrase")
            .click("label[for=phrase]")
            .click(
                ".modal-access-by-software > .modal-background.is-open > .modal button[type=submit]"
            )
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
                ".modal-enter-account-id > .modal-background.is-open > .modal",
                5000
            )
            .waitForElementVisible(
                "input[placeholder='shard.realm.account']",
                5000
            )
            .setValue(
                "input[placeholder='shard.realm.account']",
                mnemonicPhraseAccountId
            )
            .click(
                ".modal-enter-account-id > .modal-background.is-open > .modal button[type=submit]"
            )
            .waitForElementVisible(".interface-form", 10000)
            .assert.urlContains("interface/send-transfer")
            .end();
    }
};
