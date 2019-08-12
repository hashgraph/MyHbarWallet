import { RootState } from "@/store";
import { ADD_ALERT, REMOVE_ALERT } from "@/store/mutations";
import { ALERT } from "@/store/actions";
import { ActionContext } from "vuex";

let alertId = 0;

interface NewAlert {
    message: string;
    level: string;
}

interface Alert extends NewAlert {
    id: number;
}

export interface State {
    queue: Alert[];
}

export default {
    state: {
        queue: []
    } as State,
    mutations: {
        [ADD_ALERT](state: State, alert: Alert) {
            state.queue.push(alert);
        },
        [REMOVE_ALERT](state: State, id: number) {
            for (let i = 0; i < state.queue.length; i++) {
                if (state.queue[i].id === id) {
                    state.queue.splice(i, 1);
                    break;
                }
            }
        }
    },
    actions: {
        [ALERT](
            { commit }: ActionContext<State, RootState>,
            payload: NewAlert
        ) {
            const alert = {
                id: ++alertId,
                ...payload
            };

            commit(ADD_ALERT, alert);

            setTimeout(() => {
                commit(REMOVE_ALERT, alert.id);
            }, 5000);
        }
    }
};
