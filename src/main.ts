import "./main.css";
import "./directives";
import Vue, { VNode } from "vue";
import App from "./App.vue";
import router from "./router";
import { plugin as VueFunctionApi } from "vue-function-api";

// Globally install the Vue3 Function API
Vue.use(VueFunctionApi);

new Vue({
    router,
    render: (h): VNode => h(App)
}).$mount("#app");
