import type {
  Client,
  PublicKey,
  PrivateKey,
  AccountId,
  TokenId,
  FileId,
  TransactionRecord,
  TokenInfo
} from "@hashgraph/sdk";
import { BigNumber } from "bignumber.js";

import {
  AccountBalance,
  SimpleHederaClient,
  SimpleTransfer,
} from "../../../hedera";

import { getAccountBalance } from "./get-account-balance";
import { transfer } from "./transfer";
import { createAccount } from "./create-account";
import { associateToken } from "./associate-token";
import { uploadFile } from "./upload-file";
import { downloadFile } from "./download-file";
import { getAccountRecords } from "./get-account-records";
import { getTokenInfo } from "./get-token-info";
import { getTransactionRecord } from "./get-transaction-record";

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

  async getAccountBalance(): Promise<AccountBalance> {
    // Workaround for extraneous signing in SDK, 
    // use an operator - less client for balance queries
    const { Client } = await import("@hashgraph/sdk");
    const client = Client.forNetwork(this._client.network);
    return getAccountBalance(client);
  }

  transfer(options: {
    transfers: SimpleTransfer[];
    memo: string | null;
    maxFee: BigNumber | null;
    onBeforeConfirm?: () => void;
  }): Promise<void> {
    return transfer(this._client, options);
  }

  createAccount(options: {
    publicKey: PublicKey;
    initialBalance: BigNumber;
  }): Promise<AccountId | null> {
    return createAccount(this._client, options);
  }

  // Associate a list of tokens to an account
  associateToken(options: {
    account: AccountId;
    tokens: TokenId[];
  }): Promise<void> {
    return associateToken(this._client, options);
  }

  uploadFile(options: {
    file: Uint8Array;
    fileMemo: string | null;
    memo: string | null;
  }): Promise<FileId | null> {
    return uploadFile(this._client, options);
  }

  downloadFile(options: {
    fileId: FileId;
  }): Promise<Uint8Array> {
    return downloadFile(this._client, options);
  }

  getAccountRecords(): Promise<TransactionRecord[]>{
    return getAccountRecords();
  }

  getTokenInfo(options: { token: string | TokenId }): Promise<TokenInfo>{
    return getTokenInfo(this._client, options);
  }

  getTransactionRecord(options: { transactionHash: string }): Promise<TransactionRecord>{
    return getTransactionRecord(options);
  }
}
