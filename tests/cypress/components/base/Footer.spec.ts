import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import Footer from "../../../../src/components/base/Footer.vue";

// TODO: Fix
describe("Footer.vue", () => {
    it("renders", () => {
        mount(Footer, {
            global: {
                mocks: {
                    $t: (msg: string) => msg
                },
            }
        });
    });
});
