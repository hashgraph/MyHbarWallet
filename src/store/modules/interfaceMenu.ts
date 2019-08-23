import { SET_INTERFACE_MENU_IS_OPEN } from "../../store/mutations";

export interface State {
    isOpen: boolean;
}

export default {
    state: {
        isOpen: false
    },
    mutations: {
        [SET_INTERFACE_MENU_IS_OPEN](state: State, isOpen: boolean): void {
            state.isOpen = isOpen;
        }
    }
};
