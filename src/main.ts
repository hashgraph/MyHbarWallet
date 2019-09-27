import "./main.css";
import "./directives";
import Vue, { VNode } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import Router from "vue-router";
import VueCompositionApi from "@vue/composition-api";
import store from "./store";
import { ERROR_OCCURRED } from "./store/mutations";

// Globally install the Vue3 Function API
Vue.use(VueCompositionApi);
Vue.use(Router);

// Globally catch uncaught exceptions and store it
Vue.config.errorHandler = (error: Error | string) => {
    store.commit(ERROR_OCCURRED, { error });
};

new Vue({
    router,
    render: (h): VNode => h(App),
    i18n
}).$mount("#app");
