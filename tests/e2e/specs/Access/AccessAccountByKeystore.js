const keystoreAccountId = "0.0.60118";
const keystoreIncorrectAccountId = "0.0.666";
const keystorePath = __dirname + "/../../assets/keystore_file";
const keystorePassword = "ThisIsARandomPassword";
const keystoreIncorrectPassword = "$^$^$^$^$^$^$^$^";
const keystorePublicKey =
    "302a300506032b6570032100389ac2dd5574527b37513463822bbee3869664b46421f0627a82d0c305728d4b";

module.exports = {
    "it can access account by keystore file": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .click(".home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .click(".account-tile-button:not(.disabled):nth-child(2)")
            .waitForElementVisible("label[for=file]", 5000)
            .click("label[for=file]")
            .click(
                ".modal-access-by-software > .modal-background.is-open > .modal button[type=submit]"
            )
            .setValue("#file-upload", require("path").resolve(keystorePath))
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
                keystorePassword + "\n"
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
                keystoreAccountId
            )
            .click(
                ".modal-enter-account-id > .modal-background.is-open > .modal button[type=submit]"
            )
            .waitForElementVisible(".interface-form", 10000)
            .waitForElementVisible(".interface .balance .hbar-balance", 10000)
            .assert.urlContains("interface/send-transfer")
            .assert.containsText(".account .subtitle", keystoreAccountId);
    },

    "it can view balance information": browser => {
        browser.expect
            .element(".interface .balance .hbar-balance")
            .text.to.match(
                /^([1-9]\d{0,2}(?:,\d{3})*(\.\d{1,9})?|0?\.(?=.*[1-9])\d{1,9}) ℏ$/
            );
        browser.waitForElementVisible(".interface .balance .usd-balance", 5000);
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
                keystorePublicKey
            )
            .moveTo("div.modal-background")
            .mouseButtonDown()
            .mouseButtonUp();
    },

    "it can view account id modal": browser => {
        browser
            .click(".qr-icon")
            .waitForElementVisible(".pub-qr > canvas:nth-child(1)", 5000)
            .assert.containsText(".account-id .value", keystoreAccountId)
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
    },

    "it fails to access keystore file with incorrect password": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .click(".home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .click(".account-tile-button:not(.disabled):nth-child(2)")
            .waitForElementVisible("label[for=file]", 5000)
            .click("label[for=file]")
            .click(
                ".modal-access-by-software > .modal-background.is-open > .modal button[type=submit]"
            )
            .setValue("#file-upload", require("path").resolve(keystorePath))
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
                keystoreIncorrectPassword + "\n"
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
            .click(".home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .click(".account-tile-button:not(.disabled):nth-child(2)")
            .waitForElementVisible("label[for=file]", 5000)
            .click("label[for=file]")
            .click(
                ".modal-access-by-software > .modal-background.is-open > .modal button[type=submit]"
            )
            .setValue("#file-upload", require("path").resolve(keystorePath))
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
                keystorePassword + "\n"
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
                keystoreIncorrectAccountId + "\n"
            )
            .waitForElementVisible(
                ".modal-enter-account-id > .modal-background.is-open > .modal .error",
                5000
            )
            .assert.containsText(
                ".modal-enter-account-id > .modal-background.is-open > .modal .error",
                "This account does not exist in the network."
            )
            .end();
    },

    "it can get public key if an account hasn't been created": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .click(".home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .click(".account-tile-button:not(.disabled):nth-child(2)")
            .waitForElementVisible("label[for=file]", 5000)
            .click("label[for=file]")
            .click(
                ".modal-access-by-software > .modal-background.is-open > .modal button[type=submit]"
            )
            .setValue("#file-upload", require("path").resolve(keystorePath))
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
                keystorePassword + "\n"
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
                keystorePublicKey
            )
            .end();
    }
};
