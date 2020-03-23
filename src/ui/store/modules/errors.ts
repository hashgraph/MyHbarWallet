export interface State {
    queue: Error[];
}

export interface LedgerError {
    name?: string;
    message?: string;
    statusCode?: number;
}

export interface LedgerErrorPayload {
    error: LedgerError;
    showAlert: boolean;
}

export interface LedgerErrorTuple {
    message: string;
    error: LedgerError;
}

export interface HederaStatusErrorPayload {
    error: import("@hashgraph/sdk").HederaStatusError;
    showAlert: boolean;
}

export interface HederaStatusErrorTuple {
    message: string;
    error: import("@hashgraph/sdk").HederaStatusError;
}
