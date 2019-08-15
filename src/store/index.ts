import Vue from "vue";
import Vuex from "vuex";
import Alerts, { State as AlertsState } from "./modules/alerts";
import InterfaceMenu, {
    State as InterfaceMenuState
} from "./modules/interfaceMenu";
import Crypto, { State as CryptoState } from "./modules/crypto";

Vue.use(Vuex);

export interface RootState {
    alerts: AlertsState;
    interfaceMenu: InterfaceMenuState;
    crypto: CryptoState;
}

export default new Vuex.Store<RootState>({
    modules: {
        alerts: Alerts,
        interfaceMenu: InterfaceMenu,
        crypto: Crypto
    }
});
