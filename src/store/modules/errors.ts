import {ERROR_OCCURRED, ERROR_VIEWED} from "../mutations";
import {ERROR_DESCRIPTION, RAW_ERROR} from "../getters";

export interface State {
    newErrorOccurred: boolean;
    errorDescription: string | null;
    error: Error | null;
    errorMessageViewed: boolean;
}

export default {
    state: {
        newErrorOccurred: false,
        errorDescription: null,
        error: null,
        errorMessageViewed: false
    } as State,
    mutations: {
        [ERROR_OCCURRED](state: State, e: { description: string; error: Error }): void {
            state.newErrorOccurred = true;
            state.error = e.error;
            state.errorDescription = e.description;
            state.errorMessageViewed = false;
        },
        [ERROR_VIEWED](state: State): void {
            state.newErrorOccurred = false;
            state.error = null;
            state.errorDescription = null;
            state.errorMessageViewed = true;
        }
    },
    getters: {
        [RAW_ERROR]: (state: State): (Error | null) => {
            return state.error;
        },
        [ERROR_DESCRIPTION]: (state: State): string => {
            return state.errorDescription != null ? state.errorDescription : "";
        }
    }
};
