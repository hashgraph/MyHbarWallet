// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { BigNumber } from "bignumber.js";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalByHardwareState } from "../../components/ModalAccessByHardware.vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalCreateByKeystoreState } from "../../components/ModalCreateByKeystore.vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalDownloadKeystoreState } from "../../components/ModalDownloadKeystore.vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalAccessByPhraseState } from "../components/ModalAccessByPhrase";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalAccessByPrivateKeyState } from "../components/ModalAccessByPrivateKey";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalEnterAccountIdState } from "../components/ModalEnterAccountId";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalKeystoreFilePasswordState } from "../components/ModalKeystoreFilePassword";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { User } from "../domain/user";

export interface State {
    user: User | null;
    balance: import("@hashgraph/sdk").Hbar | null;
    exchangeRate: BigNumber | null;
}

export interface ModalIsOpen {
    isOpen: boolean;
}

type ModalBySoftwareState = ModalIsOpen;
type ModalCreateByPhraseState = ModalIsOpen;
type ModalRequestToCreateAccountState = ModalIsOpen;

export interface AccountDTO {
    privateKey: import("@hashgraph/sdk").Ed25519PrivateKey | null;
    publicKey: import("@hashgraph/sdk").Ed25519PublicKey | null;
    keyFile: Uint8Array | null;
}

export interface AccountCreateDTO {
    modalCreateByHardwareState: ModalByHardwareState;
    modalCreateBySoftwareState: ModalBySoftwareState;
    modalCreateByKeystoreState: ModalCreateByKeystoreState;
    modalKeystoreFilePasswordState: ModalKeystoreFilePasswordState;
    modalDownloadKeystoreState: ModalDownloadKeystoreState;
    modalCreateByPhraseState: ModalCreateByPhraseState;
    modalEnterAccountIdState: ModalEnterAccountIdState;
    modalRequestToCreateAccountState: ModalRequestToCreateAccountState;
}

export interface AccountAccessDTO {
    modalAccessByHardwareState: ModalByHardwareState;
    modalAccessBySoftwareState: ModalBySoftwareState;
    modalKeystoreFilePasswordState: ModalKeystoreFilePasswordState;
    modalAccessByPhraseState: ModalAccessByPhraseState;
    modalAccessByPrivateKeyState: ModalAccessByPrivateKeyState;
    modalEnterAccountIdState: ModalEnterAccountIdState;
    modalRequestToCreateAccountState: ModalRequestToCreateAccountState;
}

export type AccessAccountDTO = AccountDTO & AccountAccessDTO;
export type CreateAccountDTO = AccountDTO & AccountCreateDTO;
