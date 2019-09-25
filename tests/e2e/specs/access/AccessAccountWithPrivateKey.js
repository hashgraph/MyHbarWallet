const regexUSD = require("../../assets/common/constants").regexUSD;
const regexHBar = require("../../assets/common/constants").regexHBar;
const keyPublicKey = require("../../assets/common/constants").keyPublicKey;
const keyPrivateKey = require("../../assets/common/constants").keyPrivateKey;
const keyAccountId = require("../../assets/common/constants").keyAccountId;
const keystorePassword = require("../../assets/common/constants")
    .keystorePassword;

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
    "It Can Access Account with Private Key": browser => {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .click(".home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .click(softwareAccessSelector)
            .waitForElementVisible("label[for=key]", 5000)
            .click("label[for=key]")
            .click(".modal-access-by-software > button:nth-child(3)")
            .waitForElementVisible(
                "input[placeholder='Enter Private Key']",
                5000
            )
            .setValue("input[placeholder='Enter Private Key']", keyPrivateKey)
            .click(".button-access-wallet")
            .waitForElementVisible(accountInputSelector, 5000)
            .setValue(accountInputSelector, keyAccountId)
            .click("div.buttons:nth-child(2) > button:nth-child(2)")
            .waitForElementVisible(".interface-form", 10000)
            .assert.urlContains("interface/send-transfer")
            .assert.containsText(".account .subtitle", keyAccountId);
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
            .assert.containsText(".account-id .value", keyAccountId)
            .moveTo(modalBackgroundSelector)
            .mouseButtonDown()
            .mouseButtonUp();
    },

    "It Can View Public Key": browser => {
        browser
            .click(".key-icon > path:nth-child(1)")
            .waitForElementVisible(".modal-view-keys", 5000)
            .expect.element(publicKeySelector)
            .text.to.equal(truncatePublic(keyPublicKey));
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
            .text.to.equal(truncatePrivate(keyPrivateKey));
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
    }
};
