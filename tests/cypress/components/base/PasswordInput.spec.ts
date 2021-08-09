import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import PasswordInput from "../../../../src/components/base/PasswordInput.vue";

describe("PasswordInput.vue", () => {
    it("renders", () => {
        mount(PasswordInput, {
            global: {
                mocks: {
                    $t: (msg: string) => msg
                }
            },
            props: {
                modelValue: "Password",
                confirm: true,
                error: false,
                showEye: true,
                placeholder: "Password"
            }
        });
    });
});
