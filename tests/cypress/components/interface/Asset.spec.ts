import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import Asset from "../../../../src/components/interface/Asset.vue";

describe("Asset.vue", () => {
    it("renders", () => {
        mount(Asset, {
            props: {
                img: "coin",
                name: "Asset",
                value: "0.5",
                total: "500",
                amount: "100",
                error: false,
                frozen: false
            }
        });
    });
});
