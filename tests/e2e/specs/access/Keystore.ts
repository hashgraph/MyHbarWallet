/* eslint-disable no-process-env */
import path from "path";

import NightwatchBrowser from "nightwatch";

import selectors from "../../assets/common/selectors";
import constants from "../../assets/common/constants";

export default {
    "It Can Access Account With Keystore"(browser: NightwatchBrowser.NightwatchBrowser): void {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .click(".home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .click(selectors.softwareAccessSelector)
            .waitForElementVisible("label[for=file]", 5000)
            .click("label[for=file]")
            .click(
                ".modal-access-by-software > .modal-background > .modal button[type=submit]"
            )
            .setValue("#file-upload", path.resolve(constants.keystorePath))
            .pause(1000)
            .waitForElementVisible(
                ".modal-password > .modal-background > .modal",
                5000
            )
            .waitForElementVisible(selectors.passwordSelector, 5000)
            .setValue(selectors.passwordSelector, `${constants.keystorePassword}\n`)
            .waitForElementVisible(
                ".modal-enter-account-id > .modal-background > .modal",
                5000
            )
            .waitForElementVisible(selectors.accountInputSelector, 5000)
            .setValue(selectors.accountInputSelector, constants.keystoreAccountId)
            .click(
                ".modal-enter-account-id > .modal-background > .modal button[type=submit]"
            )
            .waitForElementVisible(".interface-form", 10000)
            .waitForElementVisible(".interface .balance .hbar-balance", 10000)
            .assert.urlContains("interface/send-transfer")
            .assert.containsText(".account .subtitle", constants.keystoreAccountId);
    },

    "It Can View Balance"(browser: NightwatchBrowser.NightwatchBrowser): void {
        browser.waitForElementVisible(selectors.hbarBalanceSelector, 10000);
        browser.expect.element(selectors.hbarBalanceSelector).text.to.match(constants.regexHBar);
        browser.waitForElementVisible(selectors.usdBalanceSelector, 10000);
        browser.expect.element(selectors.usdBalanceSelector).text.to.match(constants.regexUSD);
    },

    "It Can View Account ID"(browser: NightwatchBrowser.NightwatchBrowser): void {
        browser
            .click(".qr-icon > path:nth-child(1)")
            .waitForElementVisible(".pub-qr > canvas:nth-child(1)", 5000)
            .assert.containsText(".account-id .value", constants.keystoreAccountId)
            .moveTo(selectors.modalBackgroundSelector, 0, 0)
            .mouseButtonDown("left")
            .mouseButtonUp("left");
    },

    "It Can View Public Key"(browser: NightwatchBrowser.NightwatchBrowser): void {
        browser
            .pause(500)
            .click(".key-icon > path:nth-child(1)")
            .waitForElementVisible(".modal-view-keys", 5000)
            .pause(500)
            .expect.element(selectors.publicKeySelector)
            .text.to.equal(constants.truncatePublic(constants.keystorePublicKey));
        browser
            .moveTo(selectors.modalBackgroundSelector, 0, 0)
            .mouseButtonDown("left")
            .mouseButtonUp("left");
    },

    "It Can View Private Key"(browser: NightwatchBrowser.NightwatchBrowser): void {
        browser
            .pause(500)
            .click(".key-icon > path:nth-child(1)")
            .waitForElementVisible(".modal-view-keys", 5000)
            .pause(500)
            .expect.element(selectors.privateKeySelector)
            .text.to.equal(constants.truncatePrivate(constants.keystorePrivateKey));
        browser.expect
            .element(selectors.privateKeySelector)
            .to.have.attribute("class")
            .which.contains("obscure");
        browser.click(selectors.privateKeyObscureSelector);
        browser.expect
            .element(selectors.privateKeySelector)
            .to.have.attribute("class")
            .which.not.contains("obscure");
        browser
            .moveTo(selectors.modalBackgroundSelector, 0, 0)
            .mouseButtonDown("left")
            .mouseButtonUp("left");
    },

    "It Can Download Keystore"(browser: NightwatchBrowser.NightwatchBrowser): void {
        browser
            .pause(500)
            .click(".export-keystore-icon > path:nth-child(1)")
            .waitForElementVisible(selectors.passwordSelector, 5000)
            .setValue(selectors.passwordSelector, constants.keystorePassword)
            .waitForElementVisible(selectors.passwordConfirmSelector, 5000)
            .setValue(selectors.passwordConfirmSelector, constants.keystorePassword)
            .pause(1000)
            .click(selectors.modalExportByKeystoreSubmitSelector)
            .waitForElementVisible(selectors.modalExportKeystoreSubmitSelector, 5000)
            .click(selectors.modalExportKeystoreSubmitSelector)
            .waitForElementNotPresent("modal-export-keystore", 5000);
    },

    "It Can See Log Out"(browser: NightwatchBrowser.NightwatchBrowser): void {
        browser
            .pause(500)
            .click("div.links:nth-child(3) a.router-link-active")
            .waitForElementVisible(".modal-background", 5000)
            .pause(500)
            .assert.visible(".modal-forgot-to-logout");
        browser.end();
    },

    "It Cannot Access with Incorrect Password"(browser: NightwatchBrowser.NightwatchBrowser): void {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .click(".home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .click(".account-tile-button:not(.disabled):nth-child(2)")
            .waitForElementVisible("label[for=file]", 5000)
            .click("label[for=file]")
            .click(
                ".modal-access-by-software > .modal-background > .modal button[type=submit]"
            )
            .setValue("#file-upload", path.resolve(constants.keystorePath))
            .pause(1000)
            .waitForElementVisible(
                ".modal-password > .modal-background > .modal",
                5000
            )
            .waitForElementVisible(
                ".modal-password > .modal-background > .modal input[type=password]",
                5000
            )
            .setValue(
                ".modal-password > .modal-background > .modal input[type=password]",
                `${constants.keystoreIncorrectPassword}\n`
            )
            .waitForElementVisible(
                "div.modal-password > div > div > div > div.content-container > form > div > div",
                5000
            )
            .end();
    },

    "It Cannot Access with Incorrect Account ID"(browser: NightwatchBrowser.NightwatchBrowser): void {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .click(".home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .click(".account-tile-button:not(.disabled):nth-child(2)")
            .waitForElementVisible("label[for=file]", 5000)
            .click("label[for=file]")
            .click(
                ".modal-access-by-software > .modal-background > .modal button[type=submit]"
            )
            .setValue("#file-upload", path.resolve(constants.keystorePath))
            .pause(1000)
            .waitForElementVisible(
                ".modal-password > .modal-background > .modal",
                5000
            )
            .waitForElementVisible(
                ".modal-password > .modal-background > .modal input[type=password]",
                5000
            )
            .setValue(
                ".modal-password > .modal-background > .modal input[type=password]",
                `${constants.keystorePassword}\n`
            )
            .waitForElementVisible(
                ".modal-enter-account-id > .modal-background > .modal",
                5000
            )
            .waitForElementVisible(selectors.accountInputSelector, 5000)
            .setValue(selectors.accountInputSelector, `${constants.keystoreIncorrectAccountId}\n`)
            .waitForElementVisible(
                ".modal-enter-account-id > .modal-background > .modal .error",
                5000
            )
            .assert.containsText(
                ".modal-enter-account-id > .modal-background > .modal .error",
                "Account ID not found on network"
            )
            .end();
    },

    "It Can Request Account"(browser: NightwatchBrowser.NightwatchBrowser): void {
        browser
            .url(`${process.env.VUE_DEV_SERVER_URL}`)
            .waitForElementVisible(".home-tile-button", 5000)
            .click(".home-tile-button[href='/access-my-account']")
            .waitForElementVisible(".account-tile-button", 5000)
            .click(".account-tile-button:not(.disabled):nth-child(2)")
            .waitForElementVisible("label[for=file]", 5000)
            .click("label[for=file]")
            .click(
                ".modal-access-by-software > .modal-background > .modal button[type=submit]"
            )
            .setValue("#file-upload", path.resolve(constants.keystorePath))
            .pause(1000)
            .waitForElementVisible(
                ".modal-password > .modal-background > .modal",
                5000
            )
            .waitForElementVisible(
                ".modal-password > .modal-background > .modal input[type=password]",
                5000
            )
            .setValue(
                ".modal-password > .modal-background > .modal input[type=password]",
                `${constants.keystorePassword}\n`
            )
            .waitForElementVisible(
                ".modal-enter-account-id > .modal-background > .modal",
                5000
            )
            .waitForElementVisible(selectors.accountInputSelector, 5000)
            .click(
                ".modal-enter-account-id > .modal-background > .modal button[type=button]"
            )
            .waitForElementVisible(
                ".modal-request-to-create-account > .modal-background > .modal",
                5000
            )
            .assert.containsText(
                ".modal-request-to-create-account > .modal-background > .modal .read-only-input",
                constants.truncatePublic(constants.keystorePublicKey)
            )
            .end();
    }
};
