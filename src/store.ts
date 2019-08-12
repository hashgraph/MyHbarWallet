import Vue from "vue";
import Vuex from "vuex";
import { ALERT, POP_ALERT, REMOVE_ALERT } from "@/mutations";

Vue.use(Vuex);

interface Alert {
    id: { type: number; required: true };
    message: { type: string; required: true };
    level: { type: string; required: false; default: "info" };
}

export default new Vuex.Store({
    state: {
        alerts: <Alert[]>[]
    },
    mutations: {
        [ALERT](state, alert) {
            state.alerts.push(alert);
        },
        [POP_ALERT](state) {
            state.alerts.shift();
        },
        [REMOVE_ALERT](state, id) {
            for (let i = 0; i < state.alerts.length; i++) {
                if (state.alerts[i].id === id) {
                    state.alerts.splice(i, 1);
                    break;
                }
            }
        }
    },
    actions: {}
});
