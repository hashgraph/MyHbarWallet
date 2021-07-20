import { BigNumber } from "bignumber.js";
import type { AccountId, FileId, PrivateKey, PublicKey, TokenId } from "@hashgraph/sdk";

import { Wallet } from "../domain/wallet/abstract";

import { HbarPriceService } from "./hbar-price";

export interface SimpleTransfer {
    // HBAR or Token ID (as string)
    asset?: string;
    to?: AccountId;
    // amount must be in low denom
    amount?: BigNumber.Instance;
}

export interface AccountBalance {
    // balance here in hbars
    hbars: BigNumber;
    tokens: Map<string, TokenBalance>;
}

export interface TokenBalance {
    // balance has already had decimals applied
    balance: BigNumber;
    decimals: number;
}

export interface HederaService {
    // returns null if the account ID does not match the chosen key
    createClient(options: {
        network:
        | string
        | {
            [key: string]: string | AccountId;
        };
        wallet: Wallet;
        // index into the wallet, meaning depends on the wallet type
        // 0 always means the canonical key for the wallet
        keyIndex: number;
        // account ID we wish to associate with the wallet
        accountId: AccountId;
    }): Promise<SimpleHederaClient | null>;
}

export interface SimpleHederaClient {
    // get the associated private key, if available
    getPrivateKey(): PrivateKey | null;

    // get the associated public key
    getPublicKey(): PublicKey;

    // get the associated account ID
    getAccountId(): AccountId;

    // returns the account balance in HBARs
    getAccountBalance(): Promise<AccountBalance>;

    transfer(options: {
        transfers: SimpleTransfer[];
        memo: string | null;
        maxFee: BigNumber | null; // tinybars
        onBeforeConfirm?: () => void;
    }): Promise<void>;

    createAccount(options: {
        publicKey: PublicKey;
        initialBalance: BigNumber;
    }): Promise<AccountId | null>;

    associateToken(options: {
        account: AccountId;
        tokens: TokenId[];
    }): Promise<void>;

    uploadFile(options: {
        file: Uint8Array;
        fileMemo: string | null;
        memo: string | null;
    }): Promise<FileId | null>;

    downloadFile(options: {fileId: FileId}): Promise<void>;
}
