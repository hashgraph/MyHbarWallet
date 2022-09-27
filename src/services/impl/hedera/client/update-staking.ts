import type { AccountId, Client } from "@hashgraph/sdk";

export async function updateStaking(client: Client, options: { accountId: AccountId, node: number | null, declineRewards: boolean }): Promise<void> {
    const { AccountUpdateTransaction } = await import("@hashgraph/sdk");

    const accountUpdateTransaction = new AccountUpdateTransaction()
        .setAccountId(options.accountId)
        .setDeclineStakingReward(options.declineRewards);

    if (options.node != null) {
        accountUpdateTransaction.setStakedNodeId(options.node);
    } else {
        accountUpdateTransaction.clearStakedNodeId();
    }

    try {
        await (
            await accountUpdateTransaction.execute(client)
        ).getReceipt(client);
    } catch (err) {
        throw err;
    }
}
