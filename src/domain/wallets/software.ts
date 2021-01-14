import Wallet, { LoginMethod } from "./wallet";

export default class SoftwareWallet implements Wallet {
    private readonly privateKey: import("@hashgraph/sdk").Ed25519PrivateKey;
    private readonly publicKey: import("@hashgraph/sdk").Ed25519PublicKey;

    private readonly loginMethod: LoginMethod;

    public constructor(
        loginMethod: LoginMethod,
        privateKey: import("@hashgraph/sdk").Ed25519PrivateKey,
        publicKey?: import("@hashgraph/sdk").Ed25519PublicKey
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

    public getPrivateKey(): Promise<import("@hashgraph/sdk").Ed25519PrivateKey> {
        // eslint-disable-next-line compat/compat
        return Promise.resolve(this.privateKey);
    }

    public getPublicKey(): Promise<import("@hashgraph/sdk").Ed25519PublicKey | null> {
        // eslint-disable-next-line compat/compat
        return Promise.resolve(this.publicKey);
    }

    public signTransaction(): Promise<Uint8Array | null> {
        throw new Error("unreachable: signTransaction should not be called if hasPrivateKey is true");
    }
}
