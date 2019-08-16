import "./main.css";
import "./directives";
import Vue, { VNode } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { plugin as VueFunctionApi } from "vue-function-api";

// Globally install the Vue3 Function API
Vue.use(VueFunctionApi);

new Vue({
    router,
    store,
    render: (h): VNode => h(App)
}).$mount("#app");
