import type { PrivateKey, PublicKey } from "@hashgraph/sdk";

import { Wallet } from "./abstract";

export class KeystoreSoftwareWallet extends Wallet {
    private readonly _keystore: Uint8Array;
    private readonly _password: string;

    private _privateKey: PrivateKey | null = null;

    constructor(keystore: Uint8Array, password: string) {
      super();

      this._keystore = keystore;
      this._password = password;
    }

    async getTransactionSigner(): Promise<
        (transactionBody: Uint8Array) => Promise<Uint8Array>
        > {
      const privateKey = await this.getPrivateKey();

      return (transactionBody) =>
        Promise.resolve(privateKey.sign(transactionBody));
    }

    async getPublicKey(): Promise<PublicKey> {
      return (await this.getPrivateKey()).publicKey;
    }

    async getPrivateKey(): Promise<PrivateKey> {
      const { PrivateKey } = await import("@hashgraph/sdk");

      if (this._privateKey == null) {
        this._privateKey = await PrivateKey.fromKeystore(
          this._keystore,
          this._password
        );
      }

      return this._privateKey;
    }

    hasPrivateKey(): boolean {
      return true;
    }
}
