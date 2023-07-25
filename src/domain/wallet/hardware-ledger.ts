import { Buffer } from "buffer";

import type { PublicKey } from "@hashgraph/sdk";
import Transport from "@ledgerhq/hw-transport";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import BIPPath from "bip32-path";

import { useStore } from "../../store";

import { Wallet } from "./abstract";

const PATH = (index: number) => `44/3030/0/0/${index}`;

const CLA = 0xE0;
const INS_GET_PK = 0x02;
const INS_SIGN_TX = 0x04;

const P1_UNUSED_APDU = 0x00;
const P2_UNUSED_APDU = 0x00;

const OPEN_TIMEOUT = 100000;
const LISTENER_TIMEOUT = 300000;

interface APDU {
  CLA: number;
  INS: number;
  P1: number;
  P2: number;
  buffer: Buffer;
}

export class LedgerHardwareWallet extends Wallet {
  private transport: Transport | null = null;
  private publicKeys: Map<number, PublicKey> = new Map();

  private serializePath(path: Array<number>): Buffer {
    const data = Buffer.alloc(1 + path.length * 4);

    path.forEach((segment, index) => {
      data.writeUInt32BE(segment, 1 + index * 4);
    });

    return data;
  }

  private async getTransport(): Promise<Transport | null> {
    if (this.transport != null) {
      return this.transport;
    }

      // const TransportWebUSB = (
      //   await import("@ledgerhq/hw-transport-webusb")
      // )["default"];
      // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // // @ts-ignore
      // this.transport = await TransportWebUSB.create(
      //   OPEN_TIMEOUT,
      //   LISTENER_TIMEOUT
      // );

      const TransportWebBLE = (await import("@ledgerhq/hw-transport-web-ble"))["default"];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.transport = await TransportWebBLE.create(OPEN_TIMEOUT, LISTENER_TIMEOUT);


    if (this.transport != null) {
      this.transport.on("disconnect", async () => {
        try {
          await this.transport?.close();
          this.transport = null;
        } catch (error) {
          if (error instanceof DOMException) {
            console.error("Ledger Transport threw DOM Exception");
          } else throw error;
        }
      });
    }

    return this.transport;
  }

  private async sendAPDU(message: APDU): Promise<Buffer | null> {
    const store = useStore();
    let response: Buffer | null = null;

    store.setPromptOpen(true);
    await this.getTransport().then(async (transport) => {
      if (transport != null) {
        response = await transport.send(
          message.CLA,
          message.INS,
          message.P1,
          message.P2,
          message.buffer
        );
      }
    }).finally(
      () => store.setPromptOpen(false)
    );

    return response;
  }

  hasPrivateKey(): boolean {
    return false;
  }

  private async signTransaction(
    index: number,
    txn: Uint8Array
  ): Promise<Uint8Array> {
    // IOC hack for missing  decimal information in protos
    let decimals = P1_UNUSED_APDU;

    const store = useStore();
    const extra = store.extraInfo;

    if (extra != null && extra.decimals != null) {
      decimals = extra.decimals as number;
    }

    // TODO: Use this when the ledger app can be updated to handle full path + tx data
    // const data = Buffer.from(txn);
    // const path = this.serializePath(BIPPath.fromString(PATH(index)).toPathArray());
    // const parts = [path, data];
    // const buffer = Buffer.concat(parts);

    const data = Buffer.from(txn);
    const buffer = Buffer.alloc(4 + data.length);
    buffer.writeUInt32LE(index);
    buffer.fill(data, 4);

    const response = await this.sendAPDU({
      CLA,
      INS: INS_SIGN_TX,
      P1: decimals,
      P2: P2_UNUSED_APDU,
      buffer,
    });

    if (response != null) {
      return new Uint8Array(response.slice(0, -2));
    }

    return new Uint8Array();
  }

  async getTransactionSigner(
    index: number
  ): Promise<(transactionBody: Uint8Array) => Promise<Uint8Array>> {
    return (tx) => this.signTransaction(index, tx);
  }

  async getPublicKey(index: number): Promise<PublicKey | undefined> {
    const { PublicKey } = await import("@hashgraph/sdk");

    if (this.publicKeys.get(index) != null) {
      return this.publicKeys.get(index);
    } else {
      // NOTE: this just happens to work in the current BOLOS implementation
      const buffer = this.serializePath(BIPPath.fromString(PATH(index)).toPathArray());
      
      const response = await this.sendAPDU({
        CLA,
        INS: INS_GET_PK,
        P1: P1_UNUSED_APDU,
        P2: P2_UNUSED_APDU,
        buffer,
      });

      if (response != null) {
        const pubKeyStr = response.slice(0, -2).toString("hex");
        const pubKey = PublicKey.fromString(pubKeyStr);
        this.publicKeys.set(index, pubKey);
        return pubKey;
      }
    }
  }
}
