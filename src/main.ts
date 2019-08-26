import "./main.css";
import "./directives";
import Vue, { VNode } from "vue";
import App from "./App.vue";
import router from "./router";
import VueCompositionApi from "@vue/composition-api";

// Globally install the Vue3 Function API
Vue.use(VueCompositionApi);

new Vue({
    router,
    render: (h): VNode => h(App)
}).$mount("#app");
