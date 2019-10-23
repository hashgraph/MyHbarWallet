export interface Transactions {
    transactions: Transaction[];
}

export interface Transaction {
    id: Id;
    event: null;
    hash: string;
    node: string;
    type: TransactionType;
    consensus_at: string;
    max_fee: number;
    value: number;
    fee: number;
    memo: null;
    receipt: Receipt;
    transfers: Transfer[];
}

export interface Id {
    valid_start_at: string;
    account: string;
}

export interface Receipt {
    status: Status;
    id: null;
}

export enum Status {
    Success = "SUCCESS"
}

export interface Transfer {
    account: string;
    amount: number;
    type: TransferType;
}

export enum TransferType {
    Fee = "fee",
    Value = "value"
}

export enum TransactionType {
    CryptoTransfer = "CRYPTO_TRANSFER"
}
