import { ERROR_OCCURRED, ERROR_VIEWED } from "../mutations";
import { ERROR_MESSAGE, RAW_ERROR, HAS_ERROR } from "../getters";

export interface State {
    errors: (Error | string)[];
}

export default {
    state: {
        errors: []
    } as State,
    mutations: {
        [ERROR_OCCURRED](state: State, e: { error: Error | string }): void {
            console.log("errors", e.error);
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
            console.log("has error?", state.errors.length);
            return state.errors.length > 0;
        },
        [ERROR_MESSAGE]: (state: State): string | null => {
            const error = state.errors.length > 0 ? state.errors[0] : null;
            if (error == null) return null;
            if (error instanceof Error) return error.stack || "";

            return error;
        }
    }
};
