import preferredLocale from "preferred-locale";
import { createI18n } from "vue-i18n";

import en from "../locales/en.json";
import ja from "../locales/ja.json";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: preferredLocale(["en", "ja"], "en", {
    languageOnly: true,
    regionLowerCase: false,
  }),
  fallbackLocale: "en",
  messages: {
    en,
    ja,
  },
});

export default i18n;
