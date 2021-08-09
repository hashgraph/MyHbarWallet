import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import TransferDetail from "../../../../src/components/history/TransferDetail.vue";

describe("TransferDetail.vue", () => {
    it("renders", () => {
        mount(TransferDetail);
    });
});
