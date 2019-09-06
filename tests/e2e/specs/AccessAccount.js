module.exports = {
    "it can access account by keystore file": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .assert.containsText(
                ".home-tile-button[href='/access-my-account']",
                "Access My Account"
            )
            .click(".home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .assert.containsText(
                ".account-tile-button:nth-child(2) > .text > .title",
                "Software"
            )
            .click(".account-tile-button:nth-child(2)")
            .waitForElementVisible("label[for=file]", 5000)
            .assert.containsText("label[for=file]", "Keystore File")
            .click("label[for=file]")
            .click("button[type=submit]")
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
            .waitForElementVisible(".interface-form", 5000)
            .assert.urlContains("interface/send-transfer")
            .end();
    }
};
