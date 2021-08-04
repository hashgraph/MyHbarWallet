import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import RadioOptionAccount from "../../../../src/components/access/RadioOptionAccount.vue";

describe("RadioOptionAccount.vue", () => {
    it("renders", () => {
        mount(RadioOptionAccount, {
            props: {
                name: "Name",
                accountId: "Account",
                balance: "12345"
            }
        });
    });
});
