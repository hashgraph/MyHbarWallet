import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import Switch from "../../../../src/components/base/Switch.vue";

describe("Switch.vue", () => {
    it("renders", () => {
        mount(Switch, {
            props: {
                modelValue: true,
                label: "On"
            }
        });
    });
});
