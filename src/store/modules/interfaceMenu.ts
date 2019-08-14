import { SETISOPEN } from "@/store/mutations";

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
        [SETISOPEN](state: State, isOpen: boolean): void {
            state.isOpen = isOpen;
        }
    }
};
