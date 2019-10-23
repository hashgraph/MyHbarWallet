export type Transactions = {
    transactions: Transaction[];
};

export type Transaction = {
    id: TxId;
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
};

export type TxId = {
    valid_start_at: string;
    account: string;
};

export type Receipt = {
    status: Status;
    id: null;
};

export enum Status {
    Success = "SUCCESS"
}

export type Transfer = {
    account: string;
    amount: number;
    type: TransferType;
};

export enum TransferType {
    Fee = "fee",
    Value = "value"
}

export enum TransactionType {
    CryptoTransfer = "CRYPTO_TRANSFER"
}
