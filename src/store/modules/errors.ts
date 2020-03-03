import { HederaStatusError } from "@hashgraph/sdk";

export interface State {
    errors: Error[];
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
    error: HederaStatusError;
    showAlert: boolean;
}

export interface HederaStatusErrorTuple {
    message: string;
    error: HederaStatusError;
}
