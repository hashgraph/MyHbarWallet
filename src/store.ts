import Vue from "vue";
import {State as AlertsState} from "./store/modules/alerts";
import {State as InterfaceMenuState} from "./store/modules/interfaceMenu";
import {State as WalletState} from "./store/modules/wallet";
import {State as FeesState} from "./store/modules/fees";
import {State as ErrorsState} from "./store/modules/errors";

export interface RootState {
    alerts: AlertsState;
    interfaceMenu: InterfaceMenuState;
    wallet: WalletState;
    fees: FeesState;
    errors: ErrorsState;
}

export interface Store {
    state: RootState;
}

// Basically, just flatten the existing Vuex store into these objects and boom done

export const store = Vue.observable({
   state: {
       alerts: {
       },
       errors: {
       },
       fees: {
       },
       interfaceMenu: {
       },
       wallet: {
       }
   }
} as Store);

export const getters = {

}

export const mutations = {

};

export const actions = {

};
