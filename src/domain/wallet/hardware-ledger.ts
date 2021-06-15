import { Wallet } from "./abstract";

export class LedgerHardwareWallet extends Wallet {
  hasPrivateKey(): boolean {
    return false;
  }

  getTransactionSigner(
    index: number
  ): Promise<(transactionBody: Uint8Array) => Promise<Uint8Array>> {
    throw new Error("Method not implemented.");
  }

  getPublicKey(index: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
