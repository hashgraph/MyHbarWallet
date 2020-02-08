/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/explicit-function-return-type */
const regexUSD = require("../../assets/common/constants").regexUSD;
const regexHBar = require("../../assets/common/constants").regexHBar;
const mnemonicPhrase = require("../../assets/common/constants").mnemonicPhrase;
const keystorePassword = require("../../assets/common/constants")
    .keystorePassword;
const mnemonicPhrasePrivateKey = require("../../assets/common/constants")
    .mnemonicPhrasePrivateKey;
const mnemonicPhrasePublicKey = require("../../assets/common/constants")
    .mnemonicPhrasePublicKey;
const mnemonicPhraseAccountId = require("../../assets/common/constants")
    .mnemonicPhraseAccountId;
const passwordSelector = require("../../assets/common/selectors")
    .passwordSelector;
const passwordConfirmSelector = require("../../assets/common/selectors")
    .passwordConfirmSelector;
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
    "It Can Access Account with Mnemonic Phrase"(browser) {
        browser
        // eslint-disable-next-line no-process-env
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .click(".home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .click(softwareAccessSelector)
            .waitForElementVisible("label[for=phrase]", 5000)
            .click("label[for=phrase]")
            .click(".modal-access-by-software > button:nth-child(3)")
            .waitForElementVisible(
                ".modal-mnemonic-phrase > .modal-background > .modal",
                5000
            )
            .waitForElementVisible(
                ".modal-mnemonic-phrase > .modal-background > .modal .list-item",
                5000
            )
            .setValue(
                ".modal-mnemonic-phrase > .modal-background > .modal .list-item > .word",
                `${mnemonicPhrase}\n`
            )
            .waitForElementVisible(accountInputSelector, 5000)
            .setValue(accountInputSelector, mnemonicPhraseAccountId)
            .pause(500)
            .click("div.buttons > button:nth-child(2)")
            .waitForElementVisible(".interface-form", 10000)
            .assert.urlContains("interface/send-transfer")
            .assert.containsText(".account .subtitle", mnemonicPhraseAccountId);
    },

    "It Can View Balance"(browser) {
        browser.waitForElementVisible(hbarBalanceSelector, 10000);
        browser.expect.element(hbarBalanceSelector).text.to.match(regexHBar);
        browser.waitForElementVisible(usdBalanceSelector, 10000);
        browser.expect.element(usdBalanceSelector).text.to.match(regexUSD);
    },

    "It Can View Account ID"(browser) {
        browser
            .click(".qr-icon > path:nth-child(1)")
            .waitForElementVisible(".pub-qr > canvas:nth-child(1)", 5000)
            .assert.containsText(".account-id .value", mnemonicPhraseAccountId)
            .moveTo(modalBackgroundSelector)
            .mouseButtonDown()
            .mouseButtonUp();
    },

    "It Can View Public Key"(browser) {
        browser
            .pause(500)
            .click(".key-icon > path:nth-child(1)")
            .waitForElementVisible(".modal-view-keys", 5000)
            .expect.element(publicKeySelector)
            .text.to.equal(truncatePublic(mnemonicPhrasePublicKey));
        browser
            .moveTo(modalBackgroundSelector)
            .mouseButtonDown()
            .mouseButtonUp();
    },

    "It Can View Private Key"(browser) {
        browser
            .pause(500)
            .click(".key-icon > path:nth-child(1)")
            .waitForElementVisible(".modal-view-keys", 5000)
            .pause(500)
            .expect.element(privateKeySelector)
            .text.to.equal(truncatePrivate(mnemonicPhrasePrivateKey));
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

    "It Can Download Keystore"(browser) {
        browser
            .pause(500)
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

    "It Can See Log Out"(browser) {
        browser
            .pause(500)
            .click("div.links:nth-child(3) > a:nth-child(1)")
            .waitForElementVisible(".modal-background", 5000)
            .assert.visible(".modal-forgot-to-logout");
        browser.end();
    }
};
