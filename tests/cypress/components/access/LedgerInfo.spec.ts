import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import LedgerInfo from "../../../../src/components/access/LedgerInfo.vue";

describe("LedgerInfo.vue", () => {
    it("renders", () => {
        mount(LedgerInfo, {
            global: {
                mocks: {
                    $t: (msg: string) => msg
                }
            }
        });
    });
});
