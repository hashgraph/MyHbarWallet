import {
    SET_HAS_BEEN_TO_INTERFACE,
    SET_INTERFACE_MENU_IS_OPEN
} from "../../store/mutations";

export interface State {
    isOpen: boolean;
    hasBeenToInterface: boolean;
}

export default {
    state: {
        isOpen: false,
        hasBeenToInterface: false
    },
    mutations: {
        [ SET_INTERFACE_MENU_IS_OPEN ](state: State, isOpen: boolean): void {
            state.isOpen = isOpen;
        },
        [ SET_HAS_BEEN_TO_INTERFACE ](state: State, visited: boolean): void {
            state.hasBeenToInterface = visited;
        }
    }
};
