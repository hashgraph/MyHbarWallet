import type { PublicKey, PrivateKey } from "@hashgraph/sdk";

// index:
// < 0 => alternative deriviations or forms (mnemonics have tons of these)
// = 0 => canonical deriviation of a key from the wallet
// - mnemonic, non-legacy root + .derive(0)
// - ledger, index: 0
// - others, as-is
// > 0 => additional accounts from the wallet
// - mnemonic, non-legacy root + .derive(N)
// - ledger, index: N
// - others, not supported

export abstract class Wallet {
    // produce a transaction signer
    // that can be used to sign transactions
    abstract getTransactionSigner(
        index: number
    ): Promise<(transactionBody: Uint8Array) => Promise<Uint8Array>>;

    // get the public key associated with the wallet
    abstract getPublicKey(index: number): Promise<PublicKey | undefined>;

    /** Get the private key associated with the wallet (if avaialble) */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPrivateKey(_index: number): Promise<PrivateKey | null> {
      return Promise.resolve(null);
    }

    // returns true if there is an accessible private key
    hasPrivateKey(): boolean {
      return false;
    }

    get minIndex(): number {
      return 0;
    }

    get maxIndex(): number {
      return 0;
    }
}
