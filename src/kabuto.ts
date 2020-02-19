import { kabutoRequest, getCancelToken } from "./request";

export interface EntityId {
    account?: string;
    topic?: string;
    contract?: string;
    file?: string;
}

export interface TransactionTransfer {
    account: string;
    amount: number;
}

export enum TransactionStatus {
    Success = "SUCCESS"
}

export enum TransactionType {
    ContractCall = "CONTRACT_CALL",
    ContractCreate = "CONTRACT_CREATE",
    ContractUpdate = "CONTRACT_UPDATE",
    ContractDelete = "CONTRACT_DELETE",
    CryptoTransfer = "CRYPTO_TRANSFER",
    CryptoCreate = "CRYPTO_CREATE",
    CryptoAddClaim = "CRYPTO_ADD_CLAIM",
    CryptoDelete = "CRYPTO_DELETE",
    CryptoDeleteClaim = "CRYPTO_DELETE_CLAIM",
    CryptoUpdate = "CRYPTO_UPDATE",
    FileAppend = "FILE_APPEND",
    FileCreate = "FILE_CREATE",
    FileDelete = "FILE_DELETE",
    FileUpdate = "FILE_UPDATE",
    SystemDelete = "SYSTEM_DELETE",
    SystemUndelete = "SYSTEM_UNDELETE",
    Freeze = "FREEZE",
}

export interface Transaction {
    id: string;
    validStartAt: string;
    hash: string;
    operator: string;
    node: string;
    type: TransactionType;
    consensusAt: string;
    maxFee: number;
    value: number;
    fee: number;
    memo: string | null;
    status: string;
    gasUsed?: number;
    entity?: string | EntityId;
    consensusMessageSequenceNumber?: number;
    transfers: TransactionTransfer[];
}

interface TransactionsResponse {
    transactions: Transaction[];
}

const endpoint = (extra: string): string => `v1/transaction${extra}`;
const findTransactionsWithIdToken = getCancelToken();

export async function getTransactions(testnet: boolean): Promise<Transaction[]> {
    const response: TransactionsResponse = await kabutoRequest(endpoint(""), testnet);
    return response.transactions;
}

export async function findTransactionsWithId(id: string, testnet: boolean): Promise<Transaction[]> {
    const q = { id };
    const qText = window.encodeURIComponent(JSON.stringify(q));
    const response: TransactionsResponse = await kabutoRequest(
        endpoint(`?q=${qText}`),
        testnet,
        findTransactionsWithIdToken
    );
    return response.transactions;
}

export async function trollKabuto(id: string, testnet: boolean): Promise<void> {
    let trolled = false;
    let iterations = 0;
    while (!trolled) {
        // eslint-disable-next-line no-await-in-loop
        const transactions = await findTransactionsWithId(id, testnet);
        if (transactions.length > 0) trolled = true;
        if (iterations > 10) trolled = true;
        iterations++;
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
}
