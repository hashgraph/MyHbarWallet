import Vue from "vue";
import Vuex from "vuex";
import Alerts, { State as AlertsState } from "./modules/alerts";

Vue.use(Vuex);

export interface RootState {
    alerts: AlertsState;
}

export default new Vuex.Store<RootState>({
    modules: {
        alerts: Alerts
    }
});
