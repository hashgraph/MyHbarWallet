import "./main.css";
import "./directives";
import Vue, { VNode } from "vue";
import App from "./App.vue";
import router from "./router";
import Router from "vue-router";
import VueCompositionApi from "@vue/composition-api";

// Globally install the Vue3 Function API
Vue.use(VueCompositionApi);
Vue.use(Router);

new Vue({
    router,
    render: (h): VNode => h(App)
}).$mount("#app");
