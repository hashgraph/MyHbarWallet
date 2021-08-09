import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import TextInput from "../../../../src/components/base/TextInput.vue";

describe("TextInput.vue", () => {
    it("renders", () => {
        mount(TextInput, {
            props: {
                modelValue: "Input",
                hide: false,
                placeholder: "Placeholder",
                valid: true,
                error: false,
                multiline: false,
                maxLength: 100,
                charCounter: true,
                showEye: false,
                autoFocus: true,
                autoComplete: false,
                readOnly: false,
                mediumFont: false,
                disabled: false
            }
        });
    });
});
