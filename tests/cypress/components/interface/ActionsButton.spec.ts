import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import ActionsButton from "../../../../src/components/interface/ActionsButton.vue";

describe("ActionsButton.vue", () => {
    it("renders", () => {
        mount(ActionsButton);
    });
});
