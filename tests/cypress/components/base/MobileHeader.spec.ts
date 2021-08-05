import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import MobileHeader from "../../../../src/components/base/MobileHeader.vue";

describe("MobileHeader.vue", () => {
    it("renders", () => {
        mount(MobileHeader);
    });
});
