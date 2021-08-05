import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import KeyInput from "../../../../src/components/base/KeyInput.vue";

describe("KeyInput.vue", () => {
    it("renders", () => {
        mount(KeyInput, {
            global: {
                mocks: {
                    $t: (msg: string) => msg
                }
            },
            props: {
                secret: false,
                label: "Label",
                modelValue: "Content",
                disabled: false,
                canCopy: true,
                readOnly: false,
                valid: true,
                error: false
            }
        });
    });
});
