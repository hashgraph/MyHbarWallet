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
import { mutations } from "./ui/store";

declare const IS_ELECTRON: string;

// Globally install the Vue3 Function API
Vue.use(VueCompositionApi);
Vue.use(Router);

// Globally catch uncaught exceptions and store it
/* eslint-disable-next-line @typescript-eslint/unbound-method */
Vue.config.errorHandler = function(error: Error): void {
    mutations.errorOccurred({ error });
};

new Vue({
    router,
    render: (h): VNode => h(App),
    i18n
}).$mount("#app");

if ("serviceWorker" in navigator && !IS_ELECTRON) {
    // Use the window load event to keep the page load performant
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js");
    });
}
