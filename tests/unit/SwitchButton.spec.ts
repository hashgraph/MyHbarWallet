import { shallowMount } from "@vue/test-utils";
import SwitchButton from "../../src/components/SwitchButton.vue";

describe("SwitchButton.vue", () => {
    it("renders", () => {
        const handler = jest.fn();
        const wrapper = shallowMount(SwitchButton, {
            propsData: { checked: false },
            listeners: {
                change: handler
            }
        });

        const el = wrapper.find("input").element as HTMLInputElement;

        expect(el.checked).toBe(false);

        wrapper.trigger("click");

        expect(el.checked).toBe(true);
        expect(handler).toBeCalledTimes(1);
    });
});
