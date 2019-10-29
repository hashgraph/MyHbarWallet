import { ERROR_OCCURRED, ERROR_VIEWED } from "../mutations";
import { ERROR_MESSAGE, RAW_ERROR, HAS_ERROR } from "../getters";
import { ALERT, HANDLE_HEDERA_ERROR, HANDLE_LEDGER_ERROR } from "../actions";
import { StatusCodes } from "@ledgerhq/hw-transport";
import i18n from "../../../src/i18n";
import { ActionContext } from "vuex";
import { RootState } from "..";

export interface State {
    errors: (Error | string)[];
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
    state: {
        errors: []
    } as State,
    mutations: {
        [ERROR_OCCURRED](state: State, e: { error: Error | string }): void {
            state.errors.push(e.error);
        },
        [ERROR_VIEWED](state: State): void {
            state.errors.pop();
        }
    },
    getters: {
        [RAW_ERROR]: (state: State): Error | string | null => {
            return state.errors.length > 0 ? state.errors[0] : null;
        },
        [HAS_ERROR]: (state: State): boolean => {
            return state.errors.length > 0;
        },
        [ERROR_MESSAGE]: (state: State): string | null => {
            const error = state.errors.length > 0 ? state.errors[0] : null;
            if (error == null) return null;
            if (error instanceof Error) {
                console.warn(error.toString());
                return error.toString() || "";
            }

            return error;
        }
    },
    actions: {
        async [HANDLE_HEDERA_ERROR](
            { dispatch }: ActionContext<State, RootState>,
            payload: HederaErrorPayload
        ): Promise<HederaErrorTuple> {
            let message = "";
            const severity = "error";

            const { ResponseCodeEnum } = await (import(
                "@hashgraph/sdk"
            ) as Promise<typeof import("@hashgraph/sdk")>);

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
                    message =
                        i18n.t("common.error.unhandled") +
                        `${payload.error.codeName}`;
            }

            if (payload.showAlert) {
                dispatch(ALERT, { message, level: severity });
            }

            return { message, error: payload.error };
        },
        async [HANDLE_LEDGER_ERROR](
            { dispatch }: ActionContext<State, RootState>,
            payload: LedgerErrorPayload
        ): Promise<LedgerErrorTuple> {
            // https://github.com/LedgerHQ/ledgerjs/blob/master/packages/errors/src/index.js#L196-L227
            let message = "";
            let severity = "error";

            switch (payload.error.statusCode) {
                case StatusCodes.SECURITY_STATUS_NOT_SATISFIED:
                case StatusCodes.CONDITIONS_OF_USE_NOT_SATISFIED:
                case StatusCodes.ACCESS_CONDITION_NOT_FULFILLED:
                    message = i18n.t("common.error.lockedDevice").toString();
                    severity = "warn";
                    break;
                case StatusCodes.INCORRECT_LENGTH:
                case StatusCodes.FILE_NOT_FOUND:
                case StatusCodes.COMMAND_INCOMPATIBLE_FILE_STRUCTURE:
                    message = i18n.t("common.error.wrongApp").toString();
                    severity = "warn";
                    break;
                default:
                    console.log(payload.error.statusCode);
                    console.log(payload.error);
                    message = i18n
                        .t("common.error.generalDeviceError")
                        .toString();
            }

            if (payload.showAlert) {
                dispatch(ALERT, { message, level: severity });
            }

            return { message, error: payload.error };
        }
    }
};
