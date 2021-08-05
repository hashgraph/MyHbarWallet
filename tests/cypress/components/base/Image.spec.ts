import { mount } from "@cypress/vue";

import "../../../../src/index.css";
import Image from "../../../../src/components/base/Image.vue";

describe("Image.vue", () => {
    it("renders", () => {
        mount(Image, {
            props: {
                dark: null,
                light: null
            }
        });
    });
});
