import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import AccountIdInput from "../../../../src/components/base/AccountIdInput.vue";

describe("AccountIdInput.vue", () => {
    it("renders", () => {
        mount(AccountIdInput, {
            props: {
                modelValue: null,
                disabled: false,
                placeholder: "Placeholder",
                error: false
            }
        });
    });
});
