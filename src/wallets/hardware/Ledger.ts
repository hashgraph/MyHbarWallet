/* eslint-disable @typescript-eslint/ban-ts-ignore */
import Wallet, { LoginMethod } from "../Wallet";
import "regenerator-runtime"; // https://github.com/LedgerHQ/ledgerjs/issues/332
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
// @ts-ignore
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import { Ed25519PrivateKey, Ed25519PublicKey, PublicKey } from "@hashgraph/sdk";
import Transport from "@ledgerhq/hw-transport";
import platform from "platform";

// Preserving, in case we need this later
// export const LEDGER_HEDERA_PATH = "44'/3030'/0'/0'/0'";

export const INDEX = 0x00; // Key Index on Ledger

// eslint-disable-next-line prettier/prettier
export const CLA = 0xE0;
const INS_GET_PK = 0x02;
const INS_SIGN_TX = 0x04;

const P1_UNUSED_APDU = 0x00;
const P2_UNUSED_APDU = 0x00;

const OPEN_TIMEOUT = 10000;
const LISTENER_TIMEOUT = 30000;

export type LedgerDeviceStatus = {
    deviceStatus: number;
    publicKey?: PublicKey | null;
    deviceId?: string;
};

interface APDU {
    CLA: number;
    INS: number;
    P1: number;
    P2: number;
    buffer: Buffer;
}

export default class Ledger implements Wallet {
    private publicKey: Ed25519PublicKey | null = null;

    public hasPrivateKey(): boolean {
        return false;
    }

    public async getPrivateKey(): Promise<Ed25519PrivateKey> {
        throw new Error("Cannot get private key from ledger wallet");
    }

    public async getPublicKey(): Promise<PublicKey | null> {
        if (this.publicKey === null) {
            const buffer = Buffer.alloc(4);
            buffer.writeUInt32LE(INDEX, 0);

            const response = await this.sendAPDU({
                CLA,
                INS: INS_GET_PK,
                P1: P1_UNUSED_APDU,
                P2: P2_UNUSED_APDU,
                buffer
            });

            if (response !== null) {
                const publicKeyStr = response
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    .slice(0, response.length - 2)
                    .toString("hex");

                const publicKey = (await import(
                    "@hashgraph/sdk"
                )).Ed25519PublicKey.fromString(publicKeyStr);

                this.publicKey = publicKey;
            } else {
                throw new Error("Unexpected Empty Response from Ledger Device");
            }
        }

        return this.publicKey;
    }

    public getLoginMethod(): LoginMethod {
        return LoginMethod.Ledger;
    }

    public async signTransaction(
        txnData: Buffer | Uint8Array
    ): Promise<Uint8Array | null> {
        const dataBuffer = Buffer.from(txnData);
        const buffer = Buffer.alloc(4 + dataBuffer.length);

        buffer.writeUInt32LE(INDEX, 0);
        buffer.fill(dataBuffer, 4);

        const response = await this.sendAPDU({
            CLA,
            INS: INS_SIGN_TX,
            P1: P1_UNUSED_APDU,
            P2: P2_UNUSED_APDU,
            buffer
        });

        if (response !== null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore1
            return new Uint8Array(response.slice(0, response.length - 2));
        }

        throw new Error("Unexpected Empty Response From Ledger Device");
    }

    private async getTransport(): Promise<Transport> {
        // If electron, use the node-hid transport
        // if (process.env != null) return TransportNodeHID.create();

        // WebUSB is *supposed* to work on Windows (and Opera?), but alas
        const webusbSupported =
            (await TransportWebUSB.isSupported()) &&
            platform.os!.family !== "Windows" &&
            platform.name !== "Opera";

        if (webusbSupported) return TransportWebUSB.create();

        // const u2fTransport = await TransportU2F.create(
        //     OPEN_TIMEOUT,
        //     LISTENER_TIMEOUT
        // );
        // u2fTransport.setScrambleKey("BOIL");

        // return u2fTransport;

        const transportWebHID = TransportWebHID.create(
            OPEN_TIMEOUT,
            LISTENER_TIMEOUT
        );
        transportWebHID.setScrambleKey("BOIL");
        return transportWebHID;
    }

    private async sendAPDU(message: APDU): Promise<Buffer | null> {
        let response: Buffer | null = null;

        // DO NOT SEPARATE CREATE THEN.
        // Transports REQUIRE a context managed async callback
        await this.getTransport().then(async transport => {
            response = await transport.send(
                message.CLA,
                message.INS,
                message.P1,
                message.P2,
                message.buffer
            );
        });

        return response;
    }
}

export { Ledger };
