import Vue from "vue";
import Vuex from "vuex";
import Alerts, { State as AlertsState } from "./modules/alerts";
import InterfaceMenu, {
    State as InterfaceMenuState
} from "./modules/interfaceMenu";

Vue.use(Vuex);

export interface RootState {
    alerts: AlertsState;
    interfaceMenu: InterfaceMenuState;
}

export default new Vuex.Store<RootState>({
    modules: {
        alerts: Alerts,
        interfaceMenu: InterfaceMenu
    }
});
