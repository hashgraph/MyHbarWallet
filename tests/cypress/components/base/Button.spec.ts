import { mount } from "@cypress/vue";
import Button from "../../../../src/components/base/Button.vue";

it("Button", () => {
    mount(Button, {
        slots: {},
    });
});
