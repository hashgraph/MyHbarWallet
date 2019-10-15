import Wallet from "../Wallet";
import "regenerator-runtime"; // https://github.com/LedgerHQ/ledgerjs/issues/332
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";

export const LEDGER_HEDERA_PATH = "44'/3030'/0'/0'/0'";

export const CLA = 0xE0;
const INS_GET_PK = 0x02;
const INS_SIGN_TX = 0x04;

const P1_MORE_APDU = 0x80;
const P1_NO_VERIFY_APDU = 0x00;
const P2_MORE_APDU = 0x80;

export type LedgerDeviceStatus = {
    deviceStatus: number;
    publicKey?: import("@hashgraph/sdk").PublicKey | null;
    deviceId?: string;
};

function splitPath(path: string): number[] {
    const result: number[] = [];
    const components = path.split("/");

    components.forEach(element => {
        let number = parseInt(element, 10);

        if (isNaN(number)) {
            throw new TypeError("Path element is NaN");
        }

        if (element.length > 1 && element[element.length - 1] === "'") {
            number += 0x80000000;
        }

        result.push(number);
    });

    return result;
}

export default class LedgerNanoS implements Wallet {
    public hasPrivateKey(): boolean {
        return false;
    }

    public async getPrivateKey(): Promise<
        import("@hashgraph/sdk").Ed25519PrivateKey
    > {
        throw new Error("Cannot get private key from ledger wallet");
    }

    public async getPublicKey(): Promise<
        import("@hashgraph/sdk").PublicKey | null
    > {
        const paths = splitPath(LEDGER_HEDERA_PATH);
        const buffer = Buffer.alloc(1 + paths.length * 4);

        buffer[0] = paths.length;
        paths.forEach((element, index) => {
            buffer.writeUInt32BE(element, 1 + 4 * index);
        });

        let transport: TransportWebUSB | null | void = null;
        let response: Buffer | null = null;

        try {
            transport = await TransportWebUSB.create().then(
                async (transport: TransportWebUSB) => {
                    response = await transport.send(
                        CLA,
                        INS_GET_PK,
                        P1_NO_VERIFY_APDU, // P1_MORE_APDU
                        P2_MORE_APDU,
                        buffer
                    );
                }
            );

            if (response !== null) {
                const publicKeyStr = response
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    .slice(0, response.length - 2)
                    .toString("hex");

                const publicKey = (await import(
                    "@hashgraph/sdk"
                )).Ed25519PublicKey.fromString(publicKeyStr);

                return publicKey;
            }

            return null;
        } finally {
            if (transport !== null && transport !== undefined) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                await transport.close();
            }
        }
    }

    public async signTransaction(
        txnData: Buffer | Uint8Array
    ): Promise<Uint8Array | null> {
        const paths = splitPath(LEDGER_HEDERA_PATH);
        const dataBuffer = Buffer.from(txnData);
        const buffer = Buffer.alloc(1 + dataBuffer.length + paths.length * 4);

        buffer[0] = paths.length;
        buffer.fill(dataBuffer, 1 + paths.length * 4);
        paths.forEach((element, index) => {
            buffer.writeUInt32BE(element, 1 + 4 * index);
        });

        let transport: TransportWebUSB | null | void = null;
        let response: Buffer | null = null;

        try {
            transport = await TransportWebUSB.create().then(
                async (transport: TransportWebUSB) => {
                    response = await transport.send(
                        CLA,
                        INS_SIGN_TX,
                        P1_MORE_APDU,
                        P2_MORE_APDU,
                        buffer
                    );
                }
            );

            if (response !== null) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                return new Uint8Array(response.slice(0, response.length - 2));
            }

            return null;
        } finally {
            if (transport !== null && transport !== undefined) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                await transport.close();
            }
        }
    }
}
