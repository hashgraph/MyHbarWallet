import { Ed25519PrivateKey, AccountId } from "@hashgraph/sdk";

import {
    constructClient,
    testClient,
    constructSession
} from "../../src/service/hedera";
import SoftwareWallet from "../../src/domain/wallets/software/SoftwareWallet";
import { LoginMethod } from "../../src/domain/wallets/Wallet";
import { availableNetworks } from "../../src/domain/network";

const PRIVATE_KEY =
    "302e020100300506032b6570042204207f7ac6c8025a15ff1e07ef57c7295601379a4e9a526560790ae85252393868f0";

describe("Hedera Service", () => {
    it("can construct a client", async() => {
        const account = AccountId.fromString("0.0.21883");
        const privateKey = Ed25519PrivateKey.fromString(PRIVATE_KEY);
        const wallet = new SoftwareWallet(LoginMethod.PrivateKey, privateKey);
        const networkSettings = availableNetworks[ "network.testnet" ];
        const client = await constructClient(account, wallet, networkSettings);
        expect(client).toMatchInlineSnapshot(`
            Client {
              "_maxQueryPayment": Hbar {
                Symbol(hbarTinybar): "100000000",
              },
              "_maxTransactionFee": Hbar {
                Symbol(hbarTinybar): "100000000",
              },
              "_nodeClients": Object {
                "0.testnet.hedera.com:50211": Client {
                  "$callInvocationTransformer": undefined,
                  "$channel": Channel {},
                  "$interceptor_providers": Array [],
                  "$interceptors": Array [],
                },
                "1.testnet.hedera.com:50211": Client {
                  "$callInvocationTransformer": undefined,
                  "$channel": Channel {},
                  "$interceptor_providers": Array [],
                  "$interceptors": Array [],
                },
                "2.testnet.hedera.com:50211": Client {
                  "$callInvocationTransformer": undefined,
                  "$channel": Channel {},
                  "$interceptor_providers": Array [],
                  "$interceptors": Array [],
                },
                "3.testnet.hedera.com:50211": Client {
                  "$callInvocationTransformer": undefined,
                  "$channel": Channel {},
                  "$interceptor_providers": Array [],
                  "$interceptors": Array [],
                },
              },
              "_nodes": Array [
                Object {
                  "id": AccountId {
                    "account": 3,
                    "realm": 0,
                    "shard": 0,
                  },
                  "url": "0.testnet.hedera.com:50211",
                },
                Object {
                  "id": AccountId {
                    "account": 4,
                    "realm": 0,
                    "shard": 0,
                  },
                  "url": "1.testnet.hedera.com:50211",
                },
                Object {
                  "id": AccountId {
                    "account": 5,
                    "realm": 0,
                    "shard": 0,
                  },
                  "url": "2.testnet.hedera.com:50211",
                },
                Object {
                  "id": AccountId {
                    "account": 6,
                    "realm": 0,
                    "shard": 0,
                  },
                  "url": "3.testnet.hedera.com:50211",
                },
              ],
              "_operatorAccount": AccountId {
                "account": 21883,
                "realm": 0,
                "shard": 0,
              },
              "_operatorPublicKey": Ed25519PublicKey {
                "_keyData": Uint8Array [
                  72,
                  4,
                  116,
                  51,
                  92,
                  56,
                  194,
                  123,
                  253,
                  225,
                  240,
                  194,
                  1,
                  13,
                  61,
                  185,
                  94,
                  235,
                  116,
                  161,
                  248,
                  172,
                  101,
                  33,
                  47,
                  120,
                  36,
                  206,
                  26,
                  184,
                  78,
                  202,
                ],
              },
              "_operatorSigner": [Function],
            }
        `);
    });

    it("can test a client", async() => {
        const account = AccountId.fromString("0.0.21883");
        const privateKey = Ed25519PrivateKey.fromString(PRIVATE_KEY);
        const wallet = new SoftwareWallet(LoginMethod.PrivateKey, privateKey);
        const networkSettings = availableNetworks[ "network.testnet" ];
        const client = await constructClient(account, wallet, networkSettings);
        const result = await testClient(account, client!);
        expect(result).toBe(true);
    });

    it("can construct a session", async() => {
        const account = AccountId.fromString("0.0.21883");
        const privateKey = Ed25519PrivateKey.fromString(PRIVATE_KEY);
        const wallet = new SoftwareWallet(LoginMethod.PrivateKey, privateKey);
        const networkSettings = availableNetworks[ "network.testnet" ];
        const session = await constructSession(
            account,
            wallet,
            networkSettings
        );
        expect(session).toMatchInlineSnapshot(`
            Object {
              "account": AccountId {
                "account": 21883,
                "realm": 0,
                "shard": 0,
              },
              "client": Client {
                "_maxQueryPayment": Hbar {
                  Symbol(hbarTinybar): "100000000",
                },
                "_maxTransactionFee": Hbar {
                  Symbol(hbarTinybar): "100000000",
                },
                "_nodeClients": Object {
                  "0.testnet.hedera.com:50211": Client {
                    "$callInvocationTransformer": undefined,
                    "$channel": Channel {},
                    "$interceptor_providers": Array [],
                    "$interceptors": Array [],
                  },
                  "1.testnet.hedera.com:50211": Client {
                    "$callInvocationTransformer": undefined,
                    "$channel": Channel {},
                    "$interceptor_providers": Array [],
                    "$interceptors": Array [],
                  },
                  "2.testnet.hedera.com:50211": Client {
                    "$callInvocationTransformer": undefined,
                    "$channel": Channel {},
                    "$interceptor_providers": Array [],
                    "$interceptors": Array [],
                  },
                  "3.testnet.hedera.com:50211": Client {
                    "$callInvocationTransformer": undefined,
                    "$channel": Channel {},
                    "$interceptor_providers": Array [],
                    "$interceptors": Array [],
                  },
                },
                "_nodes": Array [
                  Object {
                    "id": AccountId {
                      "account": 3,
                      "realm": 0,
                      "shard": 0,
                    },
                    "url": "0.testnet.hedera.com:50211",
                  },
                  Object {
                    "id": AccountId {
                      "account": 4,
                      "realm": 0,
                      "shard": 0,
                    },
                    "url": "1.testnet.hedera.com:50211",
                  },
                  Object {
                    "id": AccountId {
                      "account": 5,
                      "realm": 0,
                      "shard": 0,
                    },
                    "url": "2.testnet.hedera.com:50211",
                  },
                  Object {
                    "id": AccountId {
                      "account": 6,
                      "realm": 0,
                      "shard": 0,
                    },
                    "url": "3.testnet.hedera.com:50211",
                  },
                ],
                "_operatorAccount": AccountId {
                  "account": 21883,
                  "realm": 0,
                  "shard": 0,
                },
                "_operatorPublicKey": Ed25519PublicKey {
                  "_keyData": Uint8Array [
                    72,
                    4,
                    116,
                    51,
                    92,
                    56,
                    194,
                    123,
                    253,
                    225,
                    240,
                    194,
                    1,
                    13,
                    61,
                    185,
                    94,
                    235,
                    116,
                    161,
                    248,
                    172,
                    101,
                    33,
                    47,
                    120,
                    36,
                    206,
                    26,
                    184,
                    78,
                    202,
                  ],
                },
                "_operatorSigner": [Function],
              },
            }
        `);
    });
});
