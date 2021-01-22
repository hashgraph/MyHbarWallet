/* eslint-disable @typescript-eslint/ban-ts-ignore, compat/compat */
import { getters } from "../../ui/store";

import Wallet, { LoginMethod } from "./wallet";

// Preserving, in case we need this later
// (this path w/o index is encoded in the BOLOS app)
// export const LEDGER_HEDERA_PATH = "44'/3030'/0'/0'/0'";

const INDEX = 0x00; // Key Index on Ledger

const CLA = 0xE0;
const INS_GET_PK = 0x02;
const INS_SIGN_TX = 0x04;

const P1_UNUSED_APDU = 0x00;
const P2_UNUSED_APDU = 0x00;

const OPEN_TIMEOUT = 100000;
const LISTENER_TIMEOUT = 300000;

declare const IS_ELECTRON: boolean;

export interface LedgerDeviceStatus {
    deviceStatus: number;
    publicKey?: import("@hashgraph/sdk").PublicKey | null;
    deviceId?: string;
}

interface APDU {
    CLA: number;
    INS: number;
    P1: number;
    P2: number;
    buffer: Buffer;
}

const AndroidRegex = /android/i;
const LGRegex = /webos/i;
const AppleRegex = /iphone|ipad|ipod/i;
const GoogleRegex = /nexus|pixel/i;

export default class Ledger implements Wallet {
    private publicKey: import("@hashgraph/sdk").Ed25519PublicKey | null = null;
    private transport: import("@ledgerhq/hw-transport").default | null = null;

    public hasPrivateKey(): boolean {
        return false;
    }

    public getPrivateKey(): Promise<import("@hashgraph/sdk").Ed25519PrivateKey> {
        throw new Error("Cannot get private key from ledger wallet");
    }

    public async getPublicKey(): Promise<import("@hashgraph/sdk").Ed25519PublicKey | null> {
        if (this.publicKey == null) {
            // eslint-disable-next-line no-undef
            const buffer = Buffer.alloc(4);
            buffer.writeUInt32LE(INDEX, 0);

            const response = await this.sendAPDU({
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

                const publicKey = (await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk")).Ed25519PublicKey.fromString(publicKeyStr);

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

    public async signTransaction(txnData: Buffer | Uint8Array): Promise<Uint8Array | null> {
        // IOC hack
        // Need to reverse lookup the decimals for tokens, to pass it as a parameter
        // to the ledger, because the decimals for tokens are nowhere in the protos
        // as of Fri, Jan 22, 2021
        // "I can't believe I've done this"^tm
        let decimals = P1_UNUSED_APDU;
        const extra = getters.extraTxInfo();
        if (extra.decimals != null) {
            decimals = extra.decimals;
        }

        // eslint-disable-next-line no-undef
        const dataBuffer = Buffer.from(txnData);
        // eslint-disable-next-line no-undef
        const buffer = Buffer.alloc(4 + dataBuffer.length);

        buffer.writeUInt32LE(INDEX, 0);
        buffer.fill(dataBuffer, 4);

        const response = await this.sendAPDU({
            CLA,
            INS: INS_SIGN_TX,
            P1: decimals,
            P2: P2_UNUSED_APDU,
            buffer
        });

        if (response != null) {
            // @ts-ignore
            return new Uint8Array(response.slice(0, -2));
        }

        throw new Error("Unexpected Empty Response From Ledger Device");
    }

    private isMobile(platform: typeof import(/* webpackChunkName: "hardware" */ "platform")): boolean {
        if (typeof platform.product !== "undefined") {
            if (platform.product != null) {
                if (AppleRegex.exec(platform.product) != null ||
                    AndroidRegex.exec(platform.product) != null ||
                    LGRegex.exec(platform.product) != null ||
                    GoogleRegex.exec(platform.product)) {
                    return true;
                }
            }
        }

        return false;
    }

    private async getTransport(): Promise<import("@ledgerhq/hw-transport").default> {
        if (this.transport != null) {
            return this.transport;
        }

        // Support NodeHID for Electron
        // eslint-disable-next-line no-process-env, no-undef
        if (IS_ELECTRON) {
            // @ts-ignore
            const TransportNodeHID = (await import(/* webpackChunkName: "hardware" */ "@ledgerhq/hw-transport-node-hid-noevents"))[ "default" ];
            const devices = await TransportNodeHID.list();
            this.transport = await TransportNodeHID.open(devices[ 0 ]); // sorry if you connect more than 1
            return this.transport!;
        }

        const platform = (await import(/* webpackChunkName: "platform" */ "platform"))[ "default" ];

        if (this.isMobile(platform)) {
            // @ts-ignore
            const TransportWebBLE = (await import(/* webpackChunkName: "hardware" */ "@ledgerhq/hw-transport-web-ble"))[ "default" ];
            this.transport = await TransportWebBLE.create(
                OPEN_TIMEOUT,
                LISTENER_TIMEOUT
            );
        } else {
            // @ts-ignore
            const TransportWebHID = (await import(/* webpackChunkName: "hardware" */ "@ledgerhq/hw-transport-webhid"))[ "default" ];
            const TransportWebUSB = (await import(/* webpackChunkName: "hardware" */ "@ledgerhq/hw-transport-webusb"))[ "default" ];

            // WebHID should be what we're doing but it's still unstable on Chrome
            const shouldUseWebHid = false;

            // WebUSB is *supposed* to work on Windows (and Opera?), but alas
            const webusbSupported = await TransportWebUSB.isSupported() &&
            platform.os!.family !== "Windows" &&
            platform.name !== "Opera";

            if (shouldUseWebHid) {
                this.transport = await TransportWebHID.create(
                    OPEN_TIMEOUT,
                    LISTENER_TIMEOUT
                );
            } else if (webusbSupported) {
                this.transport = await TransportWebUSB.create(
                    OPEN_TIMEOUT,
                    LISTENER_TIMEOUT
                );
            } else {
                const TransportU2F = (await import(/* webpackChunkName: "hardware" */ "@ledgerhq/hw-transport-u2f"))[ "default" ];
                this.transport = await TransportU2F.create(
                    OPEN_TIMEOUT,
                    LISTENER_TIMEOUT
                );

                // U2F requires a pre-negotiated scramble key
                // Don't steal this
                this.transport.setScrambleKey("BOIL");
            }
        }

        // Kill this on disconnect event
        this.transport!.on("disconnect", async() => {
            try {
                await this.transport!.close();
                this.transport = null;
            } catch (error) {
                if (error instanceof DOMException) { /* lol why ledger */ } else {
                    throw error;
                }
            }
        });

        return this.transport!;
    }

    private async sendAPDU(message: APDU): Promise<Buffer | null> {
        let response: Buffer | null = null;

        // DO NOT SEPARATE CREATE THEN.
        // Transports REQUIRE a context managed async callback
        /* eslint-disable promise/always-return */
        await this.getTransport().then(async(transport) => {
            response = await transport.send(
                message.CLA,
                message.INS,
                message.P1,
                message.P2,
                message.buffer
            );
        });
        /* eslint-enable promise/always-return */

        return response;
    }
}

export { Ledger };

