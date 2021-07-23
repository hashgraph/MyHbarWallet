import type { Mnemonic, PrivateKey, PublicKey } from "@hashgraph/sdk";

import { Wallet } from "./abstract";

enum MnemonicVariant {
  RootDeriveZero = 0,
  Root = -1,
  Null = -2,
  NullDeriveZero = -3,
  NullDerive255 = -4,
  RootDeriveNeg1 = -5,
  RootDerive0xffffffffff = -6,
  RootLegacyDeriveZero = -7,
  RootLegacyDeriveNeg1 = -8,
  RootLegacyDerive0xffffffffff = -9,
  LegacyRoot = -10,
  LegacyRootDeriveZero = -11,
  LegacyRootDeriveZeroZero = -12,
  LegacyRootDeriveNeg1 = -13,
  LegacyRootDerive0xffffffffff = -14,
}

// Note: why these indices?
// Historical Reasons^tm
// For example, 0xffffffffff is from SDK versions 1.4.6 - 1.4.8
// inadvertently using this index when creating new accounts

export class MnemonicSoftwareWallet extends Wallet {
  private _mnemonic: Mnemonic;
  private _password: string;

  private _privateKeyCache: Map<number, PrivateKey> = new Map();

  constructor(mnemonic: Mnemonic, password: string) {
    super();

    this._mnemonic = mnemonic;
    this._password = password;
  }

  getMnemonic(): Mnemonic {
    return this._mnemonic;
  }

  getPassword(): string {
    return this._password;
  }

  async getTransactionSigner(
    index: number
  ): Promise<(transactionBody: Uint8Array) => Promise<Uint8Array>> {
    const privateKey = await this.getPrivateKey(index);

    if (privateKey != null) {
      return (transactionBody: Uint8Array) =>
        Promise.resolve(privateKey.sign(transactionBody));
    } else {
      return () => { throw new Error("No available private key"); }
    }
  }

  async getPublicKey(index: number): Promise<PublicKey | undefined> {
    const privateKey = await this.getPrivateKey(index);
    if (privateKey) return privateKey.publicKey;
  }

  async getPrivateKey(index: number): Promise<PrivateKey | null> {
    let privateKey = this._privateKeyCache.get(index);

    if (privateKey != null) {
      return privateKey;
    }

    switch (index as MnemonicVariant) {
      case MnemonicVariant.Root: {
        try {
          privateKey = await this._mnemonic.toPrivateKey(this._password);
        } catch (error) {
          console.warn(error);
        }
        break;
      }

      case MnemonicVariant.Null: {
        try {
          privateKey = await this._mnemonic.toPrivateKey("null");
        } catch (error) {
          console.warn(error);
        }
        break;
      }

      case MnemonicVariant.RootDeriveZero: {
        const rootPrivateKey = await this.getPrivateKey(
          MnemonicVariant.Root
        );
        if (rootPrivateKey != null) {
          if (rootPrivateKey.isDerivable()) {
            privateKey = await rootPrivateKey.derive(0);
          }
        }
        break;
      }

      case MnemonicVariant.RootDeriveNeg1: {
        const rootPrivateKey = await this.getPrivateKey(
          MnemonicVariant.Root
        );
        if (rootPrivateKey != null) {
          if (rootPrivateKey.isDerivable())
            privateKey = await rootPrivateKey.derive(-1);
        }
        break;
      }

      case MnemonicVariant.RootDerive0xffffffffff: {
        const rootPrivateKey = await this.getPrivateKey(MnemonicVariant.Root);
        if (rootPrivateKey != null) {
          if (rootPrivateKey.isDerivable())
            privateKey = await rootPrivateKey.derive(1099511627775);
        }
        break;
      }

      case MnemonicVariant.NullDeriveZero: {
        const rootPrivateKey = await this.getPrivateKey(
          MnemonicVariant.Null
        );
        if (rootPrivateKey != null) {
          if (rootPrivateKey.isDerivable())
            privateKey = await rootPrivateKey.derive(0);
        }
        break;
      }

      case MnemonicVariant.NullDerive255: {
        const rootPrivateKey = await this.getPrivateKey(
          MnemonicVariant.Null
        );
        if (rootPrivateKey != null) {
          if (rootPrivateKey.isDerivable())
            privateKey = await rootPrivateKey.derive(255);
        }
        break;
      }

      case MnemonicVariant.RootLegacyDeriveZero: {
        const rootPrivateKey = await this.getPrivateKey(
          MnemonicVariant.Root
        );
        if (rootPrivateKey != null) {
          privateKey = await rootPrivateKey.legacyDerive(0);
        }
        break;
      }

      case MnemonicVariant.RootLegacyDeriveNeg1: {
        const rootPrivateKey = await this.getPrivateKey(
          MnemonicVariant.Root
        );
        if (rootPrivateKey != null) {
          privateKey = await rootPrivateKey.legacyDerive(-1);
        }
        break;
      }

      case MnemonicVariant.RootLegacyDerive0xffffffffff: {
        const rootPrivateKey = await this.getPrivateKey(MnemonicVariant.Root);
        if (rootPrivateKey != null) {
          privateKey = await rootPrivateKey.legacyDerive(1099511627775);
        }
        break;
      }

      case MnemonicVariant.LegacyRoot: {
        try {
          privateKey = await this._mnemonic.toLegacyPrivateKey();
        } catch (error) {
          console.warn(error);
        }
        break;
      }

      case MnemonicVariant.LegacyRootDeriveZero: {
        const rootPrivateKey = await this.getPrivateKey(
          MnemonicVariant.LegacyRoot
        );
        if (rootPrivateKey != null) {
          privateKey = await rootPrivateKey.legacyDerive(0);
        }
        break;
      }

      case MnemonicVariant.LegacyRootDeriveZeroZero: {
        const rootPrivateKey = await this.getPrivateKey(
          MnemonicVariant.LegacyRootDeriveZero
        );
        if (rootPrivateKey != null) {
          privateKey = await rootPrivateKey.legacyDerive(0);
        }
        break;
      }

      case MnemonicVariant.LegacyRootDeriveNeg1: {
        const rootPrivateKey = await this.getPrivateKey(
          MnemonicVariant.LegacyRoot
        );
        if (rootPrivateKey != null) {
          privateKey = await rootPrivateKey.legacyDerive(-1);
        }
        break;
      }

      case MnemonicVariant.LegacyRootDerive0xffffffffff: {
        const rootPrivateKey = await this.getPrivateKey(
          MnemonicVariant.LegacyRoot
        );
        if (rootPrivateKey != null) {
          privateKey = await rootPrivateKey.legacyDerive(1099511627775);
        }
        break;
      }

      default:
        throw new Error(
          `unsupported index ${index} for MnemonicSoftwareWallet`
        );
    }

    if (privateKey) this._privateKeyCache.set(index, privateKey);
    if (privateKey) return privateKey;
    return null;
  }

  hasPrivateKey(): boolean {
    return true;
  }

  get minIndex(): number {
    return -14;
  }
}
