import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import InputError from "../../../../src/components/base/InputError.vue";

describe("InputError.vue", () => {
    it("renders", () => {
        mount(InputError, {
            slots: {
                default: "Error Message"
            }
        });
    });
});
