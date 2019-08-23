import { shallowMount } from "@vue/test-utils";
import Button from "../../src/components/Button.vue";
import MaterialDesignIcon from "../../src/components/MaterialDesignIcon.vue";

describe("Button.vue", (): void => {
    it("renders", (): void => {
        expect.assertions(1);
        const label = "Choose a Hardware";
        const wrapper = shallowMount(Button, {
            propsData: {
                label
            }
        });

        expect(wrapper.text()).toMatch(label);
    });

    it("renders a loading spinner when busy", (): void => {
        expect.assertions(2);
        const label = "Choose a Hardware";
        const wrapper = shallowMount(Button, {
            propsData: {
                label,
                busy: true
            }
        });

        expect(wrapper.text()).not.toMatch(label);
        expect(wrapper.contains(MaterialDesignIcon)).toBe(true);
    });

    it("triggers a click handler when clicked", (): void => {
        expect.assertions(1);
        const handler = jest.fn();
        const wrapper = shallowMount(Button, {
            propsData: {
                label: ""
            },
            listeners: {
                click: handler
            }
        });

        wrapper.trigger("click");

        expect(handler).toHaveBeenCalledTimes(1);
    });
});
