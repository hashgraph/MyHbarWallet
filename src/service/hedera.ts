import { NetworkName, NetworkSettings } from "../domain/network";
import { Session } from "../domain/user";
import Wallet from "../domain/wallets/Wallet";

// Construct a Client
export async function constructClient(
    account: import("@hashgraph/sdk").AccountId,
    wallet: Wallet,
    network: NetworkSettings
): Promise<import("@hashgraph/sdk").Client | null> {
    let privateKey: import("@hashgraph/sdk").Ed25519PrivateKey | null = null;
    let publicKey: import("@hashgraph/sdk").Ed25519PublicKey | null = null;
    let signer: import("@hashgraph/sdk").TransactionSigner | null = null;

    if (wallet.hasPrivateKey()) {
        privateKey = await wallet.getPrivateKey();
    }

    publicKey = await wallet.getPublicKey() as import("@hashgraph/sdk").Ed25519PublicKey;
    signer = wallet.signTransaction.bind(wallet) as import("@hashgraph/sdk").TransactionSigner;
    let client: import("@hashgraph/sdk").Client | null = null;
    const { Client } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

    if (network.name !== NetworkName.CUSTOM) {
        if (network.name === NetworkName.MAINNET) {
            client = Client.forMainnet();
        } else if (network.name === NetworkName.TESTNET) {
            client = Client.forTestnet();
        }
    } else {
        client = new Client({
            network: {
                [ network.proxy || network.address ]: {
                    shard: network.node.shard,
                    realm: network.node.realm,
                    account: network.node.node
                }
            }
        });
    }

    if (client != null) {
        if (wallet.hasPrivateKey()) {
            client.setOperator(account, privateKey!);
        } else {
            client.setOperatorWith(account, publicKey, signer);
        }
    }

    return client;
}

// Does the operator key belong to this account?
export async function testClient(
    account: import("@hashgraph/sdk").AccountId,
    client: import("@hashgraph/sdk").Client
): Promise<boolean> {
    const { CryptoTransferTransaction, HederaStatusError, Status } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

    try {
        const tx = new CryptoTransferTransaction();
        tx.addSender(account, 0); // Transfer 0 Tinybar
        tx.setMaxTransactionFee(1); // Max Fee 1 Tinybar
        await (await tx.execute(client)).getReceipt(client);
    } catch (error) {
        if (error instanceof HederaStatusError) {
            // If the transaction fails with Insufficient Tx Fee, this means
            // that the account ID verification succeeded before this point
            // Same for Insufficient Payer Balance
            if (error.status.code === Status.InsufficientTxFee.code ||
                error.status.code === Status.InsufficientPayerBalance.code) {
                return true;
            }
        }
        throw error;
    }

    return false;
}

export async function constructSession(
    account: import("@hashgraph/sdk").AccountId,
    wallet: Wallet,
    network: NetworkSettings
): Promise<Session | null> {
    try {
        const client = await constructClient(account, wallet, network);
        if (client != null) {
            if (await testClient(account, client)) { // Throws
                return {
                    account,
                    client
                };
            }
        }
    } catch (error) {
        throw error;
    }
    return null;
}

function prefix(prefix: string, key: string): string {
    if (key.startsWith(prefix)) return key;
    return `${prefix}${key}`;
}

const publicPrefix = "302a300506032b657003210013d392c9";
export function prefixPublic(key: string): string {
    return prefix(publicPrefix, key);
}

const privatePrefix = "302e020100300506032b657004220420";
export function prefixPrivate(key: string): string {
    return prefix(privatePrefix, key);
}
