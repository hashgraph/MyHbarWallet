import type { Client } from "@hashgraph/sdk";

export async function networkPing(client: Client): Promise<boolean> {
    const { AccountBalanceQuery, AccountId } = await import("@hashgraph/sdk");
    const accountId = AccountId.fromString("0.0.2");
    try{
        await new AccountBalanceQuery().setNodeAccountIds([accountId]).setAccountId(accountId).execute(client);
        return false;
    } catch(error) {
        return true;
    }
}