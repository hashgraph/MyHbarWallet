import { HederaError } from "@hashgraph/sdk";

export interface State {
    errors: Array<Error | string>;
}

export interface LedgerError {
    statusCode: number;
}

export interface LedgerErrorPayload {
    error: LedgerError;
    showAlert: boolean;
}

export interface LedgerErrorTuple {
    message: string;
    error: LedgerError;
}

export interface HederaErrorPayload {
    error: HederaError;
    showAlert: boolean;
}

export interface HederaErrorTuple {
    message: string;
    error: HederaError;
}
