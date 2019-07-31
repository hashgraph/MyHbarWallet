import { shallowMount } from "@vue/test-utils";
import Button from "../../src/components/Button.vue";
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
            propsData: { label, busy: true }
        });

        expect(wrapper.text()).not.toMatch(label);
        expect(wrapper.contains(FontAwesomeIcon)).toBe(true);
    });

    it("triggers a click handler when clicked", () => {
        const handler = jest.fn();
        const wrapper = shallowMount(Button, {
            propsData: { label: "" },
            listeners: { click: handler }
        });

        wrapper.trigger("click");

        expect(handler).toBeCalledTimes(1);
    });
});
