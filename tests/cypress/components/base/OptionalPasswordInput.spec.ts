import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import OptionalPasswordInput from "../../../../src/components/base/OptionalPasswordInput.vue";

describe("OptionalPasswordInput.vue", () => {
    it("renders", () => {
        mount(OptionalPasswordInput, {
                global: {
                    mocks: {
                        $t: (msg: string) => msg
                    }
                },
                props: {
                    modelValue: "password",
                    label: "Password",
                    placeholder: "Password",
                    hint: "Password",
                    confirm: true
                }
            });
    });
});
