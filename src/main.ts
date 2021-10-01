import "./index.css";
import "./shims-buffer";

import { createApp } from "vue";
import { createPinia } from "pinia";

import i18n from "./i18n";
import router from "./router";
import container from "./hooks/container";

import App from "./App.vue";

const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(container);
app.use(createPinia());

app.mount("#app");
