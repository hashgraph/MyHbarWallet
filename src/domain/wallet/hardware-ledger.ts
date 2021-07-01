import { Wallet } from "./abstract";
<<<<<<< HEAD

export class LedgerHardwareWallet extends Wallet {
=======
import { isElectron } from "../../utils/electron";
import { isMobile } from "../../hooks/platform";
import { PublicKey } from "@hashgraph/sdk";
import { useStore } from "../../store";

import { Buffer } from "buffer";
import Transport from "@ledgerhq/hw-transport";

// @ts-ignore
globalThis.Buffer = Buffer;

// Path /44' /3030' /0' /0' /INDEX'
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

  private async getTransport(): Promise<Transport | null> {
    if (this.transport != null) {
      return this.transport;
    }

    if (isElectron()) {
      const TransportNodeHID = (await import("@ledgerhq/hw-transport-node-hid-noevents"))[ 'default' ];
      // @ts-ignore
      this.transport = await TransportNodeHID.open("");
    } else if (await isMobile()) {
      const TransportWebBLE = (await import("@ledgerhq/hw-transport-web-ble"))[ 'default' ];
      // @ts-ignore
      this.transport = await TransportWebBLE.create(OPEN_TIMEOUT, LISTENER_TIMEOUT);
    } else {
      const TransportWebUSB = (await import("@ledgerhq/hw-transport-webusb"))[ 'default' ];
      // @ts-ignore
      this.transport = await TransportWebUSB.create(OPEN_TIMEOUT, LISTENER_TIMEOUT);
    }

    if (this.transport != null) {
      this.transport.on("disconnect", async () => {
        try {
          await this.transport?.close();
          this.transport = null;
        } catch (error) {
          if (error instanceof DOMException) {}
          else throw error;
        }
      })
    }

    return this.transport;
  }

  private async sendAPDU(message: APDU): Promise<Buffer | null> {
    let response: Buffer | null = null;

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
    });

    return response;
  }

>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
  hasPrivateKey(): boolean {
    return false;
  }

<<<<<<< HEAD
  getTransactionSigner(
    index: number
  ): Promise<(transactionBody: Uint8Array) => Promise<Uint8Array>> {
    throw new Error("Method not implemented.");
  }

  getPublicKey(index: number): Promise<any> {
    throw new Error("Method not implemented.");
=======
  private async signTransaction(index: number, txn: Uint8Array): Promise<Uint8Array> {
    // IOC hack for missing  decimal information in protos
    let decimals = P1_UNUSED_APDU;
    
    const store = useStore();
    const extra = store.extraInfo;
    
    if (extra != null && extra.decimals != null) {
      decimals = extra.decimals as number;
    }

    const data = Buffer.from(txn);
    const buffer = Buffer.alloc(4 + data.length);
    buffer.writeUInt32LE(index);
    buffer.fill(data, 4);

    const response = await this.sendAPDU({
      CLA,
      INS: INS_SIGN_TX,
      P1: decimals,
      P2: P2_UNUSED_APDU,
      buffer
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
    const buffer = Buffer.alloc(4);
    buffer.writeUInt32LE(index, 0);
    const response = await this.sendAPDU({
      CLA,
      INS: INS_GET_PK,
      P1: P1_UNUSED_APDU,
      P2: P2_UNUSED_APDU,
      buffer
    });

    if (response != null) {
      const pubKeyStr = response.slice(0, -2).toString("hex");
      const pubKey = PublicKey.fromString(pubKeyStr);
      return pubKey;
    }
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
  }
}
