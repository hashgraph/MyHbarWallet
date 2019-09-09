import VueI18n from "vue-i18n";
import Vue from "vue";

// Must use require here because importing using `import * as en from "./lang/en.json"`
// doesn't seem to work
// eslint-disable-next-line @typescript-eslint/no-var-requires
const en = require("./lang/en.json");

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: "en",
    messages: {
        en
    }
});

export default i18n;
