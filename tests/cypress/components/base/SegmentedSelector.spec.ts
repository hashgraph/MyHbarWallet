import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import SegmentedSelector from "../../../../src/components/base/SegmentedSelector.vue";

describe("SegmentedSelector.vue", () => {
    it("renders", () => {
        mount(SegmentedSelector, {
            props: {
                modelValue: 0,
                options: [1, 2, 3, 0]
            }
        });
    });
});
