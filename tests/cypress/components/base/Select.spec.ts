import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import Select from "../../../../src/components/base/Select.vue";

describe("Select.vue", () => {
    it("renders", () => {
        mount(Select, {
            props: {
                capitalize: true,
                modelValue: "select",
                options: ["select", "decline", "accept"],
                tabindex: 0,
                fullwidth: true,
                offset: 80
            }
        });
    });
});
