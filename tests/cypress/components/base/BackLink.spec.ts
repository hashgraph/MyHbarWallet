import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import BackLink from "../../../../src/components/base/BackLink.vue";

describe("BackLink.vue", () => {
    it("renders", () => {
        mount(BackLink, {
            global: {
                mocks: {
                    $t: (msg: string) => msg
                }
            },
            props: {
                to: { name: "access" }
            }
        });
    });
});
