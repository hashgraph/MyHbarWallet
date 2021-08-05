import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import EntityIdInput from "../../../../src/components/base/EntityIdInput.vue";

describe("EntityIdInput.vue", () => {
    it("renders", () => {
        mount(EntityIdInput, {
            props: {
                modelValue: null,
                disabled: false,
                placeholder: "0.0.0",
                type: "account"
            }
        });
    });
});
