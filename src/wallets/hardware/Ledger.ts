/* eslint-disable @typescript-eslint/ban-ts-ignore */
import "regenerator-runtime"; // https://github.com/LedgerHQ/ledgerjs/issues/332
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
// @ts-ignore
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import { Ed25519PrivateKey, Ed25519PublicKey, PublicKey } from "@hashgraph/sdk";
import Transport from "@ledgerhq/hw-transport";
import platform from "platform";

import Wallet, { LoginMethod } from "../Wallet";

// Preserving, in case we need this later
// export const LEDGER_HEDERA_PATH = "44'/3030'/0'/0'/0'";

export const INDEX = 0x00; // Key Index on Ledger

export const CLA = 0xE0;
const INS_GET_PK = 0x02;
const INS_SIGN_TX = 0x04;

const P1_UNUSED_APDU = 0x00;
const P2_UNUSED_APDU = 0x00;

const OPEN_TIMEOUT = 100000;
const LISTENER_TIMEOUT = 300000;

export interface LedgerDeviceStatus {
    deviceStatus: number;
    publicKey?: PublicKey | null;
    deviceId?: string;
}

interface APDU {
    CLA: number;
    INS: number;
    P1: number;
    P2: number;
    buffer: Buffer;
}

export default class Ledger implements Wallet {
    private _publicKey: Ed25519PublicKey | null = null;
    private _transport: Transport | null = null;

    public hasPrivateKey(): boolean {
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async getPrivateKey(): Promise<Ed25519PrivateKey> {
        throw new Error("Cannot get private key from ledger wallet");
    }

    public async getPublicKey(): Promise<PublicKey | null> {
        if (this._publicKey == null) {
            const buffer = Buffer.alloc(4);
            buffer.writeUInt32LE(INDEX, 0);

            const response = await this._sendAPDU({
                CLA,
                INS: INS_GET_PK,
                P1: P1_UNUSED_APDU,
                P2: P2_UNUSED_APDU,
                buffer
            });

            if (response != null) {
                const publicKeyStr = response
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                    .slice(0, -2)
                    .toString("hex");

                const publicKey = (
                    await import("@hashgraph/sdk")
                ).Ed25519PublicKey.fromString(publicKeyStr);

                this._publicKey = publicKey;
            } else {
                throw new Error("Unexpected Empty Response from Ledger Device");
            }
        }

        return this._publicKey;
    }

    public getLoginMethod(): LoginMethod {
        return LoginMethod.Ledger;
    }

    public async signTransaction(txnData: Buffer | Uint8Array): Promise<Uint8Array | null> {
        const dataBuffer = Buffer.from(txnData);
        const buffer = Buffer.alloc(4 + dataBuffer.length);

        buffer.writeUInt32LE(INDEX, 0);
        buffer.fill(dataBuffer, 4);

        const response = await this._sendAPDU({
            CLA,
            INS: INS_SIGN_TX,
            P1: P1_UNUSED_APDU,
            P2: P2_UNUSED_APDU,
            buffer
        });

        if (response != null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore1
            return new Uint8Array(response.slice(0, -2));
        }

        throw new Error("Unexpected Empty Response From Ledger Device");
    }

    private async _getTransport(): Promise<Transport> {
        // Support NodeHID for Electron

        if (this._transport != null) {
            return this._transport;
        }

        // WebHID should be what we're doing but it's still unstable on Chrome
        const shouldUseWebHid = false;

        // WebUSB is *supposed* to work on Windows (and Opera?), but alas
        const webusbSupported =
            await TransportWebUSB.isSupported() &&
            platform.os!.family !== "Windows" &&
            platform.name !== "Opera";

        if (shouldUseWebHid) {
            this._transport = await TransportWebHID.create(
                OPEN_TIMEOUT,
                LISTENER_TIMEOUT
            );
        } else if (webusbSupported) {
            this._transport = await TransportWebUSB.create(
                OPEN_TIMEOUT,
                LISTENER_TIMEOUT
            );
        } else {
            this._transport = await TransportU2F.create(
                OPEN_TIMEOUT,
                LISTENER_TIMEOUT
            );

            // U2F requires a pre-negotiated scramble key
            // Don't steal this
            this._transport.setScrambleKey("BOIL");
        }

        return this._transport!;
    }

    private async _sendAPDU(message: APDU): Promise<Buffer | null> {
        let response: Buffer | null = null;

        // DO NOT SEPARATE CREATE THEN.
        // Transports REQUIRE a context managed async callback
        return this._getTransport().then(async(transport) => {
            response = await transport.send(
                message.CLA,
                message.INS,
                message.P1,
                message.P2,
                message.buffer
            );

            return response;
        });
    }
}

export { Ledger };
