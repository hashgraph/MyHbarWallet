import Wallet, { LoginMethod } from "../Wallet";
import { Ed25519PrivateKey, PublicKey } from "@hashgraph/sdk";

export default class SoftwareWallet implements Wallet {
    private readonly _privateKey: Ed25519PrivateKey;
    private readonly _publicKey: PublicKey;

    private readonly _loginMethod: LoginMethod;

    public constructor(
        loginMethod: LoginMethod,
        privateKey: Ed25519PrivateKey,
        publicKey?: PublicKey
    ) {
        this._privateKey = privateKey;
        this._publicKey =
            typeof publicKey !== "undefined" ? publicKey : privateKey.publicKey;
        this._loginMethod = loginMethod;
    }

    public hasPrivateKey(): boolean {
        return true;
    }

    public getLoginMethod(): LoginMethod {
        return this._loginMethod;
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async getPrivateKey(): Promise<Ed25519PrivateKey> {
        return this._privateKey;
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async getPublicKey(): Promise<PublicKey | null> {
        return this._publicKey;
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async signTransaction(txnData: Buffer | Uint8Array): Promise<Uint8Array | null> {
        console.log(txnData);
        throw new Error("Not Implemented");
    }
}
