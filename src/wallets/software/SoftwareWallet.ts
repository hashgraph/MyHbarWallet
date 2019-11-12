import Wallet, { LoginMethod } from "../Wallet";
import {Ed25519PrivateKey, PublicKey} from "@hashgraph/sdk";

export default class SoftwareWallet implements Wallet {
    private readonly privateKey: Ed25519PrivateKey;
    private readonly publicKey: PublicKey;

    private readonly loginMethod: LoginMethod;

    public constructor(
        loginMethod: LoginMethod,
        privateKey: Ed25519PrivateKey,
        publicKey?: PublicKey
    ) {
        this.privateKey = privateKey;
        this.publicKey =
            publicKey !== undefined ? publicKey : privateKey.publicKey;
        this.loginMethod = loginMethod;
    }

    public hasPrivateKey(): boolean {
        return true;
    }

    public getLoginMethod(): LoginMethod {
        return this.loginMethod;
    }

    public async getPrivateKey(): Promise<
        Ed25519PrivateKey
    > {
        return this.privateKey;
    }

    public async getPublicKey(): Promise<
        PublicKey | null
    > {
        return this.publicKey;
    }

    public async signTransaction(txnData: Buffer | Uint8Array): Promise<Uint8Array | null> {
        console.log(txnData);
        throw new Error("Not Implemented");
    }
}
