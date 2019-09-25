module.exports = Object.freeze({
    accountInputSelector: "input[placeholder='shard.realm.account']",
    publicKeySelector: "div.public > div.read-only-input > div",
    privateKeySelector: "div.private > div.read-only-input > div",
    privateKeyObscureSelector: "div.private > div.read-only-input.input > svg",
    passwordSelector: "input[placeholder='Please Enter At Least 9 Characters']",
    passwordConfirmSelector: "input[placeholder='Confirm Password']",
    hbarBalanceSelector: ".interface .balance .hbar-balance",
    usdBalanceSelector: ".interface .balance .usd-balance",
    modalBackgroundSelector: "div.modal-background",
    softwareAccessSelector: ".account-tile-button:not(.disabled):nth-child(2)",
    modalExportByKeystoreSubmitSelector:
        ".modal-export-generate-keystore > .modal-background.is-open > .modal button[type=submit]",
    modalExportKeystoreSubmitSelector:
        ".modal-export-download-keystore > .modal-background.is-open > .modal button[type=submit]"
});
