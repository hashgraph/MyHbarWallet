// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalByHardwareState } from "../../components/ModalAccessByHardware";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalDownloadKeystoreState } from "../../components/ModalDownloadKeystore";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalCreateByKeystoreState } from "../../components/ModalCreateByKeystore";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { State as ModalKeystoreFilePasswordState } from "../components/ModalKeystoreFilePassword";
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
import BigNumber from "bignumber.js";
import Wallet from "../../wallets/Wallet";
import {
    Client,
    Ed25519PrivateKey,
    Ed25519PublicKey,
    AccountId
} from "@hashgraph/sdk";

export const coingeckoEndpoint =
    "https://api.coingecko.com/api/v3/coins/hedera-hashgraph?market_data=true";

export interface MarketDataJSON {
    market_data: {
        current_price: {
            usd: number;
        };
        market_cap: {
            usd: number;
        };
    };
}

export interface Session {
    account: AccountId;
    wallet: Wallet;
    client: Client;
}

export interface State {
    wallet: Wallet | null;
    session: Session | null;
    balance: BigNumber | null;
    exchangeRate: BigNumber | null;
}

export interface ModalIsOpen {
    isOpen: boolean;
}

type ModalBySoftwareState = ModalIsOpen;
type ModalCreateByPhraseState = ModalIsOpen;
type ModalRequestToCreateAccountState = ModalIsOpen;

export interface AccountDTO {
    privateKey: Ed25519PrivateKey | null;
    publicKey: Ed25519PublicKey | null;
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
