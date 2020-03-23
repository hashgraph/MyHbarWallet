import Wallet from "./wallets/Wallet";

export interface Session {
    account: import("@hashgraph/sdk").AccountId;
    client: import("@hashgraph/sdk").Client;
}

export interface User {
    session: Session;
    wallet: Wallet;
}
