import { State as ModalByHardwareState } from "../ui/components/ModalAccessByHardware.vue";
import { State as ModalCreateByKeystoreState } from "../ui/components/ModalCreateByKeystore.vue";
import { State as ModalDownloadKeystoreState } from "../ui/components/ModalDownloadKeystore.vue";
import { State as ModalAccessByPhraseState } from "../ui/components/ModalAccessByPhrase.vue";
import { State as ModalAccessByPrivateKeyState } from "../ui/components/ModalAccessByPrivateKey.vue";
import { State as ModalEnterAccountIdState } from "../ui/components/ModalEnterAccountId.vue";
import { State as ModalKeystoreFilePasswordState } from "../ui/components/ModalKeystoreFilePassword.vue";

export interface ModalIsOpen {
    isOpen: boolean;
}

type ModalBySoftwareState = ModalIsOpen;
type ModalCreateByPhraseState = ModalIsOpen;
type ModalRequestToCreateAccountState = ModalIsOpen;

export interface AccountDTO {
    possibleKeys: Array<import("@hashgraph/sdk").Ed25519PrivateKey>;
    keyFile: Uint8Array | null;
}

export interface AccountCreateDTO {
    modalCreateByHardwareState: typeof ModalByHardwareState;
    modalCreateBySoftwareState: ModalBySoftwareState;
    modalCreateByKeystoreState: typeof ModalCreateByKeystoreState;
    modalKeystoreFilePasswordState: typeof ModalKeystoreFilePasswordState;
    modalDownloadKeystoreState: typeof ModalDownloadKeystoreState;
    modalCreateByPhraseState: ModalCreateByPhraseState;
    modalEnterAccountIdState: typeof ModalEnterAccountIdState;
    modalRequestToCreateAccountState: ModalRequestToCreateAccountState;
}

export interface AccountAccessDTO {
    modalAccessByHardwareState: typeof ModalByHardwareState;
    modalAccessBySoftwareState: ModalBySoftwareState;
    modalKeystoreFilePasswordState: typeof ModalKeystoreFilePasswordState;
    modalAccessByPhraseState: typeof ModalAccessByPhraseState;
    modalAccessByPrivateKeyState: typeof ModalAccessByPrivateKeyState;
    modalEnterAccountIdState: typeof ModalEnterAccountIdState;
    modalRequestToCreateAccountState: ModalRequestToCreateAccountState;
}

export type AccessAccountDTO = AccountDTO & AccountAccessDTO;
export type CreateAccountDTO = AccountDTO & AccountCreateDTO;
