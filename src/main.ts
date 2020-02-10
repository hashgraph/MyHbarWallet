import "./main.css";
import "./directives";
import "typeface-montserrat/index.css";
import "typeface-inconsolata/index.css";
import Vue, { VNode } from "vue";
import Router from "vue-router";
import VueCompositionApi from "@vue/composition-api";
import { AsyncComponentFactory, AsyncComponentPromise } from "vue/types/options";

import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import { mutations } from "./store";

// TO DO: Help typescript make peace with the following
export function asyncComponent(componentName: string): AsyncComponentFactory {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return () => ({
        // eslint-disable-next-line function-paren-newline
        component: (import(
            /* webpackMode: "lazy-once" */
            `./components/${componentName}.vue`) as unknown) as AsyncComponentPromise
    });
}

// Globally install the Vue3 Function API
Vue.use(VueCompositionApi);
Vue.use(Router);

// Globally catch uncaught exceptions and store it
// eslint-disable-next-line @typescript-eslint/unbound-method
Vue.config.errorHandler = (error: Error): void => {
    mutations.errorOccurred({ error });
};

new Vue({
    router,
    render: (h): VNode => h(App),
    i18n
}).$mount("#app");
