import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import HardwareOptions from "../../../../src/components/access/HardwareOptions.vue";

describe("HardwareOptions.vue", () => {
    it("renders", () => {
        mount(HardwareOptions, {
            global: {
                mocks: {
                    $t: (msg: string) => msg
                }
            }
        });
    });
});
