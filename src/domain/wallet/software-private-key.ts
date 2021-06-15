import type { PrivateKey, PublicKey } from "@hashgraph/sdk";
import { Wallet } from "./abstract";

export class PrivateKeySoftwareWallet extends Wallet {
  private _privateKey: PrivateKey;

  constructor(privateKey: PrivateKey) {
    super();

    this._privateKey = privateKey;
  }

  getTransactionSigner(): Promise<
    (transactionBody: Uint8Array) => Promise<Uint8Array>
  > {
    return Promise.resolve((transactionBody) =>
      Promise.resolve(this._privateKey.sign(transactionBody))
    );
  }

  getPublicKey(): Promise<PublicKey> {
    return Promise.resolve(this._privateKey.publicKey);
  }

  getPrivateKey(): Promise<PrivateKey> {
    return Promise.resolve(this._privateKey);
  }

  hasPrivateKey(): boolean {
    return true;
  }
}
