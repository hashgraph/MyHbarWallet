import type { TokenInfo, TokenId, Client } from "@hashgraph/sdk";

export async function getTokenInfo(client: Client, options: { token: string | TokenId }): Promise<TokenInfo>{
    const { Hbar, TokenInfoQuery } = await import("@hashgraph/sdk");
    return await new TokenInfoQuery().setTokenId(options.token).setMaxQueryPayment(new Hbar(2)).execute(client);
}