import "./main.css";
import "./ui/directives";
import "typeface-montserrat";
import "typeface-inconsolata";
import Vue, { VNode } from "vue";
import Router from "vue-router";
import VueCompositionApi from "@vue/composition-api";

import App from "./ui/App.vue";
import router from "./ui/router";
import i18n from "./service/i18n";
import * as store from "./ui/store";

declare const IS_ELECTRON: string;
declare const MHW_ENV: string;

// Globally install the Vue3 Function API
Vue.use(VueCompositionApi);
Vue.use(Router);

// Globally catch uncaught exceptions and store it
/* eslint-disable-next-line @typescript-eslint/unbound-method */
Vue.config.errorHandler = function(error: Error): void {
    store.mutations.errorOccurred({ error });
};

const app = new Vue({
    router,
    render: (h): VNode => h(App),
    i18n
});

app.$mount("#app");

// For Cypress
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
window.vueapp = app;
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
window.vueapp.$store = store;

if ("serviceWorker" in navigator && !IS_ELECTRON && MHW_ENV !== "development") {
    window.addEventListener("load", () => {
        // eslint-disable-next-line compat/compat
        navigator.serviceWorker.register("./service-worker.js");
    });
}
