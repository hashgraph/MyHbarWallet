import {
  AccountBalance,
  SimpleHederaClient,
  SimpleTransfer,
} from "../../../hedera";
import type { Client, PublicKey, PrivateKey, AccountId, TokenId } from "@hashgraph/sdk";
import { getAccountBalance } from "./get-account-balance";
import { transfer } from "./transfer";
import { associateToken } from "./associate-token";
import BigNumber from "bignumber.js";

export class SimpleHederaClientImpl implements SimpleHederaClient {
  private _client: Client;

  private _privateKey: PrivateKey | null;

  constructor(client: Client, privateKey: PrivateKey | null) {
    this._client = client;
    this._privateKey = privateKey;
  }

  getPrivateKey(): PrivateKey | null {
    return this._privateKey;
  }

  getPublicKey(): PublicKey {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    return this._client.operatorPublicKey!;
  }

  getAccountId(): AccountId {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    return this._client.operatorAccountId!;
  }

  getAccountBalance(): Promise<AccountBalance> {
    return getAccountBalance(this._client);
  }

  transfer(options: {
    transfers: SimpleTransfer[];
    memo: string | null;
    maxFee: BigNumber | null;
    onBeforeConfirm?: () => void;
  }): Promise<void> {
    return transfer(this._client, options);
  }

  // Associate a list of tokens to an account
  associateToken(options: {
    account: AccountId,
    tokens: TokenId[]
  }): Promise<void> {
    return associateToken(this._client, options);
  }
}
