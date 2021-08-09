import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import RadioButton from "../../../../src/components/base/RadioButton.vue";

describe("RadioButton.vue", () => {
    it("renders", () => {
        mount(RadioButton, {
            props: {
                name: "RadioButton"
            }
        });
    });
});
