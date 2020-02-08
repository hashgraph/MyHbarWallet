import { Ed25519PrivateKey, PublicKey } from "@hashgraph/sdk";

export default interface Wallet {
    hasPrivateKey(): boolean;

    getPrivateKey(): Promise<Ed25519PrivateKey>;

    getPublicKey(): Promise<PublicKey | null>;

    getLoginMethod(): LoginMethod;

    signTransaction(arg0: Buffer | Uint8Array): Promise<Uint8Array | null>;
}

export enum LoginMethod {
    KeyStore,
    PrivateKey,
    Mnemonic,
    PasswordMnemonic,
    Ledger,
    Trezor
}
