import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import Layout from "../../../../src/components/access/Layout.vue";

describe("Layout.vue", () => {
    it("renders", () => {
        mount(Layout, {
            props: {
                title: "Title"
            },
            slots: {
                default: "Content"
            }
        });
    });
});
