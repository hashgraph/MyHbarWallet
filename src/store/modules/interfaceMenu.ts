import { SET_IS_OPEN } from "@/store/mutations";

export interface State {
    isOpen: boolean;
}

export default {
    state: {
        isOpen: false
    },
    getters: {
        isOpen: (state: State): boolean => state.isOpen
    },
    mutations: {
        [SET_IS_OPEN](state: State, isOpen: boolean): void {
            state.isOpen = isOpen;
        }
    }
};
