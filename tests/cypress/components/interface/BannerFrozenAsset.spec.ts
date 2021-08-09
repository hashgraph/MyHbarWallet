import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import BannerFrozenAsset from "../../../../src/components/interface/BannerFrozenAsset.vue";

describe("BannerFrozenAsset.vue", () => {
    it("renders", () => {
        mount(BannerFrozenAsset, {
            global: {
                mocks: {
                    $t: (msg: string) => msg
                }
            }
        });
    });
});
