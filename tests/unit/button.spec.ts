import { shallowMount } from "@vue/test-utils";
import Button from "@/components/Button.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

describe("Button.vue", () => {
    it("renders", () => {
        const label = "Choose a Hardware";
        const wrapper = shallowMount(Button, {
            propsData: { label }
        });

        expect(wrapper.text()).toMatch(label);
    });

    it("renders a loading spinner when busy", () => {
        const label = "Choose a Hardware";
        const wrapper = shallowMount(Button, {
            propsData: { label, isBusy: true }
        });

        expect(wrapper.text()).not.toMatch(label);
        expect(wrapper.contains(FontAwesomeIcon)).toBe(true);
    });
});
