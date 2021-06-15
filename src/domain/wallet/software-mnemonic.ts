import type { Mnemonic, PrivateKey, PublicKey } from "@hashgraph/sdk";
import { Wallet } from "./abstract";

enum MnemonicVariant {
  RootDeriveZero = 0,
  Root = -1,
  Null = -2,
  NullDeriveZero = -3,
  RootDeriveNeg1 = -4,
  RootLegacyDeriveZero = -5,
  RootLegacyDeriveNeg1 = -6,
  LegacyRoot = -7,
  LegacyRootDeriveZero = -8,
  LegacyRootDeriveZeroZero = -9,
  LegacyRootDeriveNeg1 = -10,
}

export class MnemonicSoftwareWallet extends Wallet {
  private _mnemonic: Mnemonic;
  private _password: string;

  private _privateKeyCache: Map<number, PrivateKey> = new Map();

  constructor(mnemonic: Mnemonic, password: string) {
    super();

    this._mnemonic = mnemonic;
    this._password = password;
  }

  async getTransactionSigner(
    index: number
  ): Promise<(transactionBody: Uint8Array) => Promise<Uint8Array>> {
    const privateKey = await this.getPrivateKey(index);

    return (transactionBody: Uint8Array) =>
      Promise.resolve(privateKey.sign(transactionBody));
  }

  async getPublicKey(index: number): Promise<PublicKey> {
    return (await this.getPrivateKey(index)).publicKey;
  }

  async getPrivateKey(index: number): Promise<PrivateKey> {
    let privateKey = this._privateKeyCache.get(index);

    if (privateKey != null) {
      return privateKey;
    }

    switch (index as MnemonicVariant) {
      case MnemonicVariant.Root:
        privateKey = await this._mnemonic.toPrivateKey(this._password);
        break;

      case MnemonicVariant.Null:
        privateKey = await this._mnemonic.toPrivateKey("null");
        break;

      case MnemonicVariant.RootDeriveZero: {
        const rootPrivateKey = await this.getPrivateKey(MnemonicVariant.Root);
        if (rootPrivateKey.isDerivable)
          privateKey = await rootPrivateKey.derive(0);
        break;
      }

      case MnemonicVariant.RootDeriveNeg1: {
        const rootPrivateKey = await this.getPrivateKey(MnemonicVariant.Root);
        if (rootPrivateKey.isDerivable)
          privateKey = await rootPrivateKey.derive(-1);
        break;
      }

      case MnemonicVariant.NullDeriveZero: {
        const rootPrivateKey = await this.getPrivateKey(MnemonicVariant.Null);
        if (rootPrivateKey.isDerivable)
          privateKey = await rootPrivateKey.derive(0);
        break;
      }

      case MnemonicVariant.RootLegacyDeriveZero: {
        const rootPrivateKey = await this.getPrivateKey(MnemonicVariant.Root);
        privateKey = await rootPrivateKey.legacyDerive(0);
        break;
      }

      case MnemonicVariant.RootLegacyDeriveNeg1: {
        const rootPrivateKey = await this.getPrivateKey(MnemonicVariant.Root);
        privateKey = await rootPrivateKey.legacyDerive(-1);
        break;
      }

      case MnemonicVariant.LegacyRoot: {
        privateKey = await this._mnemonic.toLegacyPrivateKey();
        break;
      }

      case MnemonicVariant.LegacyRootDeriveZero: {
        const rootPrivateKey = await this.getPrivateKey(
          MnemonicVariant.LegacyRoot
        );
        privateKey = await rootPrivateKey.legacyDerive(0);
        break;
      }

      case MnemonicVariant.LegacyRootDeriveZeroZero: {
        const rootPrivateKey = await this.getPrivateKey(
          MnemonicVariant.LegacyRootDeriveZero
        );
        privateKey = await rootPrivateKey.legacyDerive(0);
        break;
      }

      case MnemonicVariant.LegacyRootDeriveNeg1: {
        const rootPrivateKey = await this.getPrivateKey(
          MnemonicVariant.LegacyRoot
        );
        privateKey = await rootPrivateKey.legacyDerive(-1);
        break;
      }

      default:
        throw new Error(
          `unsupported index ${index} for MnemonicSoftwareWallet`
        );
    }

    this._privateKeyCache.set(index, privateKey);

    return privateKey;
  }

  hasPrivateKey(): boolean {
    return true;
  }

  get minIndex(): number {
    return -10;
  }
}
