import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import BalanceDetail from "../../../../src/components/history/BalanceDetail.vue";

describe("BalanceDetail.vue", () => {
    it("renders", () => {
        mount(BalanceDetail);
    });
});
