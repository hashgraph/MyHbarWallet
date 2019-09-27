module.exports = Object.freeze({
    accountInputSelector:
        ".modal-enter-account-id > .modal-background.is-open > .modal input[type=text]",
    publicKeySelector: "div.public > div.read-only-input > div",
    privateKeySelector: "div.private > div.read-only-input > div",
    privateKeyObscureSelector: "div.private > div.read-only-input.input > svg",
    passwordSelector:
        ".text-input:not(.disabled):first-child input[type=password]",
    passwordConfirmSelector:
        ".text-input:not(.disabled):nth-child(2) input[type=password]",
    hbarBalanceSelector: ".interface .balance .hbar-balance",
    usdBalanceSelector: ".interface .balance .usd-balance",
    modalBackgroundSelector: "div.modal-background",
    softwareAccessSelector: ".account-tile-button:not(.disabled):nth-child(2)",
    modalExportByKeystoreSubmitSelector:
        ".modal-export-generate-keystore > .modal-background.is-open > .modal button[type=submit]",
    modalExportKeystoreSubmitSelector:
        ".modal-export-download-keystore > .modal-background.is-open > .modal button[type=submit]"
});
