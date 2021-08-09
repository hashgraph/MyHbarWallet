import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import Title from "../../../../src/components/base/Title.vue";

describe("Title.vue", () => {
    it("renders", () => {
        mount(Title, {
            slots: {
                default: "Title"
            }
        });
    });
});
