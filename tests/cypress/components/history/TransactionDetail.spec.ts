import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import TransactionDetail from "../../../../src/components/history/TransactionDetail.vue";

describe("TransactionDetail.vue", () => {
    it("renders", () => {
        mount(TransactionDetail);
    });
});
