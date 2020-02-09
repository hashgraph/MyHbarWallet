import Wallet, { LoginMethod } from "../Wallet";
import { Ed25519PrivateKey, PublicKey } from "@hashgraph/sdk";

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
        this.publicKey = publicKey ?? privateKey.publicKey;
        this.loginMethod = loginMethod;
    }

    public hasPrivateKey(): boolean {
        return true;
    }

    public getLoginMethod(): LoginMethod {
        return this.loginMethod;
    }

    public getPrivateKey(): Promise<Ed25519PrivateKey> {
        return Promise.resolve(this.privateKey);
    }

    public getPublicKey(): Promise<PublicKey | null> {
        return Promise.resolve(this.publicKey);
    }

    public signTransaction(): Promise<Uint8Array | null> {
        throw new Error("unreachable: signTransaction should not be called if hasPrivateKey is true");
    }
}
