import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import BannerError from "../../../../src/components/interface/BannerError.vue";

describe("BannerError.vue", () => {
    it("renders", () => {
        mount(BannerError, {
            global: {
                mocks: {
                    $t: (msg: string) => msg
                }
            }
        });
    });
});
