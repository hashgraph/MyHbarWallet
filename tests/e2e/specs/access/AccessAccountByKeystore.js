const regexUSD = require("../../assets/common/constants").regexUSD;
const regexHBar = require("../../assets/common/constants").regexHBar;
const keystorePath = require("../../assets/common/constants").keystorePath;
const keystorePassword = require("../../assets/common/constants")
    .keystorePassword;
const keystoreIncorrectPassword = require("../../assets/common/constants")
    .keystoreIncorrectPassword;
const keystoreAccountId = require("../../assets/common/constants")
    .keystoreAccountId;
const keystoreIncorrectAccountId = require("../../assets/common/constants")
    .keystoreIncorrectAccountId;
const keystorePrivateKey = require("../../assets/common/constants")
    .keystorePrivateKey;
const keystorePublicKey = require("../../assets/common/constants")
    .keystorePublicKey;

const accountInputSelector = require("../../assets/common/selectors")
    .accountInputSelector;
const hbarBalanceSelector = require("../../assets/common/selectors")
    .hbarBalanceSelector;
const usdBalanceSelector = require("../../assets/common/selectors")
    .usdBalanceSelector;
const modalBackgroundSelector = require("../../assets/common/selectors")
    .modalBackgroundSelector;
const privateKeySelector = require("../../assets/common/selectors")
    .privateKeySelector;
const privateKeyObscureSelector = require("../../assets/common/selectors")
    .privateKeyObscureSelector;
const publicKeySelector = require("../../assets/common/selectors")
    .publicKeySelector;
const passwordSelector = require("../../assets/common/selectors")
    .passwordSelector;
const passwordConfirmSelector = require("../../assets/common/selectors")
    .passwordConfirmSelector;
const softwareAccessSelector = require("../../assets/common/selectors")
    .softwareAccessSelector;
const modalExportByKeystoreSubmitSelector = require("../../assets/common/selectors")
    .modalExportByKeystoreSubmitSelector;
const modalExportKeystoreSubmitSelector = require("../../assets/common/selectors")
    .modalExportKeystoreSubmitSelector;

const truncatePublic = require("../../assets/common/constants").truncatePublic;
const truncatePrivate = require("../../assets/common/constants")
    .truncatePrivate;

module.exports = {
    "It Can Access Account With Keystore": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .click(".home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .click(softwareAccessSelector)
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
            .waitForElementVisible(passwordSelector, 5000)
            .setValue(passwordSelector, keystorePassword + "\n")
            .waitForElementVisible(
                ".modal-enter-account-id > .modal-background.is-open > .modal",
                5000
            )
            .waitForElementVisible(accountInputSelector, 5000)
            .setValue(accountInputSelector, keystoreAccountId)
            .click(
                ".modal-enter-account-id > .modal-background.is-open > .modal button[type=submit]"
            )
            .waitForElementVisible(".interface-form", 10000)
            .waitForElementVisible(".interface .balance .hbar-balance", 10000)
            .assert.urlContains("interface/send-transfer")
            .assert.containsText(".account .subtitle", keystoreAccountId);
    },

    "It Can View Balance": browser => {
        browser.waitForElementVisible(hbarBalanceSelector, 10000);
        browser.expect.element(hbarBalanceSelector).text.to.match(regexHBar);
        browser.waitForElementVisible(usdBalanceSelector, 10000);
        browser.expect.element(usdBalanceSelector).text.to.match(regexUSD);
    },

    "It Can View Account ID": browser => {
        browser
            .click(".qr-icon > path:nth-child(1)")
            .waitForElementVisible(".pub-qr > canvas:nth-child(1)", 5000)
            .assert.containsText(".account-id .value", keystoreAccountId)
            .moveTo(modalBackgroundSelector)
            .mouseButtonDown()
            .mouseButtonUp();
    },

    "It Can View Public Key": browser => {
        browser
            .click(".key-icon > path:nth-child(1)")
            .waitForElementVisible(".modal-view-keys", 5000)
            .expect.element(publicKeySelector)
            .text.to.equal(truncatePublic(keystorePublicKey));
        browser
            .moveTo(modalBackgroundSelector)
            .mouseButtonDown()
            .mouseButtonUp();
    },

    "It Can View Private Key": browser => {
        browser
            .click(".key-icon > path:nth-child(1)")
            .waitForElementVisible(".modal-view-keys", 5000)
            .expect.element(privateKeySelector)
            .text.to.equal(truncatePrivate(keystorePrivateKey));
        browser.expect
            .element(privateKeySelector)
            .to.have.attribute("class")
            .which.contains("obscure");
        browser.click(privateKeyObscureSelector);
        browser.expect
            .element(privateKeySelector)
            .to.have.attribute("class")
            .which.not.contains("obscure");
        browser
            .moveTo(modalBackgroundSelector)
            .mouseButtonDown()
            .mouseButtonUp();
    },

    "It Can Download Keystore": browser => {
        browser
            .click(".export-keystore-icon > path:nth-child(1)")
            .waitForElementVisible(passwordSelector, 5000)
            .setValue(passwordSelector, keystorePassword)
            .waitForElementVisible(passwordConfirmSelector, 5000)
            .setValue(passwordConfirmSelector, keystorePassword)
            .pause(1000)
            .click(modalExportByKeystoreSubmitSelector)
            .waitForElementVisible(modalExportKeystoreSubmitSelector, 5000)
            .click(modalExportKeystoreSubmitSelector)
            .waitForElementNotPresent("modal-export-keystore", 5000);
    },

    "It Can See Log Out": browser => {
        browser
            .click("div.links:nth-child(3) > a:nth-child(1)")
            .waitForElementVisible(".home-tile-button", 10000)
            .expect.element("div.modal-background:nth-child(6)")
            .to.have.attribute("class")
            .which.contains("is-open");
        browser.end();
    },

    "It Cannot Access with Incorrect Password": browser => {
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

    "It Cannot Access with Incorrect Account ID": browser => {
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

    "It Can Request Account": browser => {
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
                truncatePublic(keystorePublicKey)
            )
            .end();
    }
};
