import { ERROR_OCCURRED, ERROR_VIEWED } from "../mutations";
import { ERROR_MESSAGE, RAW_ERROR, HAS_ERROR } from "../getters";
import { ALERT, HANDLE_HEDERA_ERROR, HANDLE_LEDGER_ERROR } from "../actions";
import { StatusCodes } from "@ledgerhq/hw-transport";
import i18n from "../../../src/i18n";
import { ActionContext } from "vuex";
import { RootState } from "..";

export interface State {
    errors: Array<Error | string>;
}

interface LedgerError {
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
    error: import("@hashgraph/sdk").HederaError;
    showAlert: boolean;
}

export interface HederaErrorTuple {
    message: string;
    error: import("@hashgraph/sdk").HederaError;
}

export default {
    state: { errors: []} as State,
    mutations: {
        [ ERROR_OCCURRED ](state: State, e: { error: Error | string }): void {
            state.errors.push(e.error);
        },
        [ ERROR_VIEWED ](state: State): void {
            state.errors.pop();
        }
    },
    getters: {
        [ RAW_ERROR ](state: State): Error | string | null {
            const error: Error | string | null =
                state.errors.length > 0 ? state.errors[ 0 ] : null;
            if (process.env.NODE_ENV !== "production") console.log(error);
            return error;
        },
        [ HAS_ERROR ](state: State): boolean {
            return state.errors.length > 0;
        },
        [ ERROR_MESSAGE ](state: State): string | null {
            const error = state.errors.length > 0 ? state.errors[ 0 ] : null;
            if (process.env.NODE_ENV !== "production") console.log(error);
            if (error == null) return null;
            if (error instanceof Error) {
                console.warn(error);
                return error.toString() || "";
            }

            return error;
        }
    },
    actions: {
        async [ HANDLE_HEDERA_ERROR ](
            { dispatch }: ActionContext<State, RootState>,
            payload: HederaErrorPayload
        ): Promise<HederaErrorTuple> {
            if (process.env.NODE_ENV !== "production") console.log(payload.error);

            let message = "";
            const severity = "error";

            const { ResponseCodeEnum } = await import("@hashgraph/sdk");

            switch (payload.error.code) {
                case ResponseCodeEnum.PAYER_ACCOUNT_NOT_FOUND:
                case ResponseCodeEnum.INVALID_ACCOUNT_ID:
                    message = i18n.t("common.error.invalidAccount").toString();
                    break;
                case ResponseCodeEnum.INVALID_SIGNATURE:
                    message = i18n
                        .t("common.error.invalidSignature")
                        .toString();
                    break;
                case ResponseCodeEnum.INVALID_TRANSACTION_START:
                    message = i18n.t("common.error.invalidDateTime").toString();
                    break;
                case ResponseCodeEnum.INSUFFICIENT_TX_FEE:
                    message = i18n
                        .t("common.error.insufficientTransactionFee")
                        .toString();
                    break;
                case ResponseCodeEnum.INSUFFICIENT_ACCOUNT_BALANCE:
                case ResponseCodeEnum.INSUFFICIENT_PAYER_BALANCE:
                    message = i18n
                        .t("common.error.insufficientPayerBalance")
                        .toString();
                    break;
                case ResponseCodeEnum.ACCOUNT_REPEATED_IN_ACCOUNT_AMOUNTS:
                    message = i18n
                        .t("common.error.cannotSendHbarToYourself")
                        .toString();
                    break;
                default:
                    console.warn(payload.error.code);
                    console.warn(payload.error.message);
                    console.warn(payload.error);
                    message =
                        `${i18n.t("common.error.unhandled")
                        }${payload.error.codeName}`;
            }

            if (payload.showAlert) {
                dispatch(ALERT, { message, level: severity });
            }

            return { message, error: payload.error };
        },
        async [ HANDLE_LEDGER_ERROR ](
            { dispatch }: ActionContext<State, RootState>,
            payload: LedgerErrorPayload
        ): Promise<LedgerErrorTuple> {
            if (process.env.NODE_ENV !== "production") console.log(payload.error);
            // https://github.com/LedgerHQ/ledgerjs/blob/master/packages/errors/src/index.js#L196-L227
            let message = "";
            let severity = "error";

            switch (payload.error.statusCode) {
                // Security Exceptions (not allowed)
                case StatusCodes.PIN_REMAINING_ATTEMPTS: // 0x63c0,
                case StatusCodes.SECURITY_STATUS_NOT_SATISFIED: // 0x6982,
                case StatusCodes.CONDITIONS_OF_USE_NOT_SATISFIED: // 0x6985,
                case StatusCodes.ACCESS_CONDITION_NOT_FULFILLED: // 0x9804,
                    message = i18n.t("common.error.lockedDevice").toString();
                    severity = "warn";
                    break;

                // Attestation / Verification failures
                case StatusCodes.CONTRADICTION_SECRET_CODE_STATUS: // 0x9808,
                case StatusCodes.CONTRADICTION_INVALIDATION: // 0x9810,
                case StatusCodes.LICENSING: // 0x6f42,
                    message = i18n.t("common.error.traitorDevice").toString();
                    break;

                // Command Error (does not make sense to device)
                case StatusCodes.INCORRECT_LENGTH: // 0x6700,
                case StatusCodes.COMMAND_INCOMPATIBLE_FILE_STRUCTURE: // 0x6981,
                case StatusCodes.INCORRECT_DATA: // 0x6a80,
                case StatusCodes.REFERENCED_DATA_NOT_FOUND: // 0x6a88,
                case StatusCodes.INCORRECT_P1_P2: // 0x6b00,
                case StatusCodes.INS_NOT_SUPPORTED: // 0x6d00,
                case StatusCodes.CLA_NOT_SUPPORTED: // 0x6e00,
                case StatusCodes.NO_EF_SELECTED: // 0x9400,
                case StatusCodes.INVALID_OFFSET: // 0x9402,
                case StatusCodes.INVALID_KCV: // 0x9485,
                    message = i18n.t("common.error.wrongApp").toString();
                    severity = "warn";
                    break;

                // Device Failure (irrecoverable device errors)
                case StatusCodes.NOT_ENOUGH_MEMORY_SPACE: // 0x6a84,
                case StatusCodes.FILE_ALREADY_EXISTS: // 0x6a89,
                case StatusCodes.TECHNICAL_PROBLEM: // 0x6f00,
                case StatusCodes.MEMORY_PROBLEM: // 0x9240,
                case StatusCodes.FILE_NOT_FOUND: // 0x9404,
                case StatusCodes.INCONSISTENT_FILE: // 0x9408,
                case StatusCodes.ALGORITHM_NOT_SUPPORTED: // 0x9484,
                case StatusCodes.CODE_NOT_INITIALIZED: // 0x9802,
                case StatusCodes.CODE_BLOCKED: // 0x9840,
                case StatusCodes.MAX_VALUE_REACHED: // 0x9850,
                case StatusCodes.GP_AUTH_FAILED: // 0x6300,
                case StatusCodes.HALTED: // 0x6faa
                    message = i18n
                        .t("common.error.generalDeviceError")
                        .toString();
                    severity = "error";
                    break;

                default:
                    console.warn(payload.error.statusCode);
                    console.warn(payload.error);
                    message = i18n
                        .t("common.error.generalDeviceError")
                        .toString();
                    severity = "warn";
                    break;
            }

            if (payload.showAlert) {
                dispatch(ALERT, { message, level: severity });
            }

            return { message, error: payload.error };
        }
    }
};
