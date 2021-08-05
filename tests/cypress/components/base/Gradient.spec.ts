import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import Gradient from "../../../../src/components/base/Gradient.vue";

describe("Gradient.vue", () => {
    it("renders", () => {
        mount(Gradient, {
            slots: {
                default: "Page Content"
            }
        });
    });
});
