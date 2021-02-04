/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

export const softwareTile = ".tile-grid > :nth-child(2)";
export const mnemonicPhraseOption = ":nth-child(2) > .radio-button";
export const privateKeyOption = ":nth-child(3) > .radio-button";
export const keystoreOption = ":nth-child(1) > .radio-button";
export const hiddenFileInput = "#file-upload";
export const keystorePasswordInput = ".text-flex-item > input";
export const keystorePasswordBtn = "form > .btn";
export const accessContinueButton = ".modal-access-by-software > button";
export const mnemonicWordSelect = ".select";
export const mnemonic12WordOption = ".select-menu > :nth-child(1)";
export const mnemonic22WordOption = ".select-menu > :nth-child(2)";
export const mnemonic24WordOption = ".select-menu > :nth-child(3)";
export const mnemonicPasswordToggle = ".password-switch > .switch-button > .thumb";
export const mnemonicPasswordInput = ".text-flex-item > input";
export const mnemonicContinueButton = ".continue-btn";
export const privateKeyInput = ".text-flex-item > input";
export const privateKeyContinueButton = ".button-access-wallet";
export const networkSelector = ".network-selector >>> .select-value";
export const testnetNetworkOption = ".select-menu > :nth-child(2)";
export const accountIdInput = ":nth-child(3) > .text-input > .label-container > .input-container > .input-wrapper > .flex-container > .text-flex-item > input";
export const accountIdContinueButton = ".buttons > [type='submit']";

export function mnemonicInput(index: number): string {
    return `:nth-child(${index}) > .word`;
}
