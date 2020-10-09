import { config } from "@vue/test-utils";

import en from "../../src/lang/en";

config.mocks.$t = (msg) => en[ msg ];

window.scrollTo = (x, y) => {
    document.documentElement.scrollTop = y;
}