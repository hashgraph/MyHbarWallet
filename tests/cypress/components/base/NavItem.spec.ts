import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import NavItem from "../../../../src/components/base/NavItem.vue";

// TODO: Fix
describe("NavItem.vue", () => {
    it("renders", () => {
        mount(NavItem, {
            props: {
                icon: null,
                activeIcon: null,
                text: "Text",
                href: null,
                to: { name: "access" },
                hightlightActive: true
            }
        });
    });
});
