import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import RadioOption from "../../../../src/components/access/RadioOption.vue";

describe("RadioOption.vue", () => {
    it("renders", () => {
        mount(RadioOption, {
            props: {
                name: "Name"
            }
        });
    });
});
