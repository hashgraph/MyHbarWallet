import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import ReloadPrompt from "../../../../src/components/base/ReloadPrompt.vue";

describe("ReloadPrompt.vue", () => {
    it("renders", () => {
        mount(ReloadPrompt);
    });
});
