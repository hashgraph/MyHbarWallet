import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import OptionCard from "../../../../src/components/base/OptionCard.vue";

describe("OptionCard.vue", () => {
    it("renders", () => {
        mount(OptionCard, {
            global: {
                mocks: {
                    $t: (msg: string) => msg
                }
            },
            props: {
                lightIcon: null,
                darkIcon: null,
                title: "Title",
                desc: "Description",
                to: { name: "access" },
                recommended: true
            }
        });
    });
});
