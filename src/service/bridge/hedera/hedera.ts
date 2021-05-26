import { AccountId, Client, TokenId, TransactionId } from "@hashgraph/sdk";
import { BigNumber } from "bignumber.js";

export async function hbarTransfer(
    recipient: AccountId,
    amount: BigNumber,
    memo: string,
    client: Client
): Promise<TransactionId> {
    const { CryptoTransferTransaction } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

    return new CryptoTransferTransaction()
        .addSender(client._getOperatorAccountId()!, amount)
        .addRecipient(recipient, amount)
        .setTransactionMemo(memo)
        .execute(client);
}

export async function tokenTransfer(
    tokenId: TokenId,
    recipient: AccountId,
    amount: BigNumber,
    memo: string,
    client: Client
): Promise<TransactionId> {
    const { TokenTransferTransaction } = await import(/* webpackChunkName: "hashgraph" */ "@hashgraph/sdk");

    return new TokenTransferTransaction()
        .addSender(tokenId, client._getOperatorAccountId()!, amount)
        .addRecipient(tokenId, recipient, amount)
        .setTransactionMemo(memo)
        .execute(client);
}
