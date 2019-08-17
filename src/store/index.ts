import Vue from "vue";
import Vuex from "vuex";
import Alerts, { State as AlertsState } from "./modules/alerts";
import InterfaceMenu, {
    State as InterfaceMenuState
} from "./modules/interfaceMenu";
import Wallet, { State as WalletState } from "./modules/wallet";

Vue.use(Vuex);

export interface RootState {
    alerts: AlertsState;
    interfaceMenu: InterfaceMenuState;
    wallet: WalletState;
}

export default new Vuex.Store<RootState>({
    modules: {
        alerts: Alerts,
        interfaceMenu: InterfaceMenu,
        wallet: Wallet
    }
});
