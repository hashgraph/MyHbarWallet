import type { AccountId, Client } from "@hashgraph/sdk";
import axios from "axios";
import BigNumber from "bignumber.js";

import { Wallet } from "../../../domain/wallet/abstract";
import {
    HederaService,
    MirrorAccountInfo,
    NetworkNodeStakingInfo,
    SimpleHederaClient,
} from "../../hedera";

import { SimpleHederaClientImpl } from "./client";

export class HederaServiceImpl implements HederaService {
    async createClient(options: {
        wallet: Wallet;
        network:
            | string
            | {
                  [key: string]: string | AccountId;
              };
        keyIndex: number;
        accountId: AccountId;
    }): Promise<SimpleHederaClient | null> {
        const { Client, AccountId } = await import("@hashgraph/sdk");

        let client;

        if (typeof options.network === "string") {
            if (options.network === "mainnet") {
                // HACK: node 0.0.3 is offline
                client = Client.forNetwork({
                    "https://node01-00-grpc.swirlds.com:443": new AccountId(4),
                });
            } else {
                // HACK: the NetworkName type is not exported
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                client = Client.forName(options.network as any);
            }
        } else {
            client = Client.forNetwork(options.network);
        }

        // NOTE: important, ensure that we pre-compute the health state of all nodes
        await client.pingAll();

        const transactionSigner = await options.wallet.getTransactionSigner(
            options.keyIndex
        );

        const privateKey = await options.wallet.getPrivateKey(options.keyIndex);
        const publicKey = await options.wallet.getPublicKey(options.keyIndex);

        if (publicKey == null) {
            return null;
        }

        // TODO: Fix
        client.setOperatorWith(
            options.accountId,
            publicKey ?? "",
            transactionSigner
        );

        if (!(await testClientOperatorMatch(client))) {
            return null;
        }

        return new SimpleHederaClientImpl(client, privateKey);
    }

    async getNodeStakingInfo(
        network: "mainnet" | "testnet" | "previewnet"
    ): Promise<NetworkNodeStakingInfo[]> {
        interface Info {
            description: string;
            node_id: number;
            node_account_id: string;
            min_stake: string;
            max_stake: string;
            stake: string;
            stake_rewarded: string;
            stake_not_rewarded: string;
            reward_rate_start: string;
            // staking period uses strings representing seconds.nanos since the epoch
            staking_period: {
                from: string;
                to: string;
            };
        }

        let urlBase = "";
        switch (network) {
            case "mainnet":
                urlBase = "mainnet-public";
                break;
            case "testnet":
                urlBase = "testnet";
                break;
            case "previewnet":
                urlBase = "previewnet";
                break;
        }

        const response = await axios.get<{
            nodes: Info[];
            links: { next?: string };
        }>(
            `https://${urlBase}.mirrornode.hedera.com/api/v1/network/nodes?order=asc&limit=25`
        );
        const result: NetworkNodeStakingInfo[] = [];
        for (const node of response.data.nodes) {
            result.push({
                description: node.description,
                node_id: node.node_id,
                node_account_id: node.node_account_id,
                min_stake: new BigNumber(node.min_stake),
                max_stake: new BigNumber(node.max_stake),
                stake: new BigNumber(node.stake),
                stake_rewarded: new BigNumber(node.stake_rewarded),
                stake_not_rewarded: new BigNumber(node.stake_not_rewarded),
                reward_rate_start: new BigNumber(node.reward_rate_start),
                staking_period: node.staking_period,
            });
        }

        if (response.data.links.next) {
            const secondResponse = await axios.get<{ nodes: Info[] }>(
                `https://${urlBase}.mirrornode.hedera.com${response.data.links.next}`
            );
            for (const node of secondResponse.data.nodes) {
                result.push({
                    description: node.description,
                    node_id: node.node_id,
                    node_account_id: node.node_account_id,
                    min_stake: new BigNumber(node.min_stake),
                    max_stake: new BigNumber(node.max_stake),
                    stake: new BigNumber(node.stake),
                    stake_rewarded: new BigNumber(node.stake_rewarded),
                    stake_not_rewarded: new BigNumber(node.stake_not_rewarded),
                    reward_rate_start: new BigNumber(node.reward_rate_start),
                    staking_period: node.staking_period,
                });
            }
        }

        return result;
    }

    async getMirrorAccountInfo(
        network: "mainnet" | "testnet" | "previewnet",
        accountId: AccountId
    ): Promise<MirrorAccountInfo> {
        let urlBase = "";
        switch (network) {
            case "mainnet":
                urlBase = "mainnet-public";
                break;
            case "testnet":
                urlBase = "testnet";
                break;
            case "previewnet":
                urlBase = "previewnet";
                break;
        }

        const response = await axios.get<MirrorAccountInfo>(
            `https://${urlBase}.mirrornode.hedera.com/api/v1/accounts/${accountId.toString()}`
        );
        return response.data;
    }
}

/** Does the operator key belong to the operator account */
async function testClientOperatorMatch(client: Client) {
    const { TransferTransaction, Hbar, Status, StatusError } = await import(
        "@hashgraph/sdk"
    );

    const tx = new TransferTransaction()
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        .addHbarTransfer(client.operatorAccountId!, Hbar.fromTinybars(0))
        .setMaxTransactionFee(Hbar.fromTinybars(1));

    try {
        await tx.execute(client);
    } catch (err) {
        if (err instanceof StatusError) {
            if (
                err.status === Status.InsufficientTxFee ||
                err.status === Status.InsufficientPayerBalance
            ) {
                // If the transaction fails with Insufficient Tx Fee, this means
                // that the account ID verification succeeded before this point
                // Same for Insufficient Payer Balance

                return true;
            }

            return false;
        }

        throw err;
    }

    // under *no* cirumstances should this transaction succeed
    throw new Error(
        "unexpected success of intentionally-erroneous transaction to confirm account ID"
    );
}
