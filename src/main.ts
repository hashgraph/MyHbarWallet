import "./main.css";
import "./directives";
import "typeface-montserrat";
import Vue, { VNode } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import Router from "vue-router";
import VueCompositionApi from "@vue/composition-api";
import { mutations } from "./store";

// Globally install the Vue3 Function API
Vue.use(VueCompositionApi);
Vue.use(Router);

// Globally catch uncaught exceptions and store it
// todo [2020-01-01]: consider removing this lint
// eslint-disable-next-line @typescript-eslint/unbound-method
Vue.config.errorHandler = (error: Error | string) => {
    mutations.errorOccurred({ error });
};

new Vue({
    router,
    render: (h): VNode => h(App),
    i18n
}).$mount("#app");
