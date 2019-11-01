import Wallet, { LoginMethod } from "../Wallet";

export default class SoftwareWallet implements Wallet {
    private readonly privateKey: import("@hashgraph/sdk").Ed25519PrivateKey;
    private readonly publicKey: import("@hashgraph/sdk").PublicKey;

    private readonly loginMethod: LoginMethod;

    public constructor(
        loginMethod: LoginMethod,
        privateKey: import("@hashgraph/sdk").Ed25519PrivateKey,
        publicKey?: import("@hashgraph/sdk").PublicKey
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
        import("@hashgraph/sdk").Ed25519PrivateKey
    > {
        return this.privateKey;
    }

    public async getPublicKey(): Promise<
        import("@hashgraph/sdk").PublicKey | null
    > {
        return this.publicKey;
    }

    public async signTransaction(
        txnData: Buffer | Uint8Array
    ): Promise<Uint8Array | null> {
        console.log(txnData);
        throw new Error("Not Implemented");
    }
}
