import { shallowMount } from "@vue/test-utils";
import Button from "../../src/components/Button.vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";

describe("Button.vue", (): void => {
    it("renders", (): void => {
        const label = "Choose a Hardware";
        const wrapper = shallowMount(Button, {
            propsData: { label }
        });

        expect(wrapper.text()).toMatch(label);
    });

    it("renders a loading spinner when busy", (): void => {
        const label = "Choose a Hardware";
        const wrapper = shallowMount(Button, {
            propsData: { label, busy: true }
        });

        expect(wrapper.text()).not.toMatch(label);
        expect(wrapper.contains(MaterialDesignIcon)).toBe(true);
    });

    it("triggers a click handler when clicked", (): void => {
        const handler = jest.fn();
        const wrapper = shallowMount(Button, {
            propsData: { label: "" },
            listeners: { click: handler }
        });

        wrapper.trigger("click");

        expect(handler).toBeCalledTimes(1);
    });
});
