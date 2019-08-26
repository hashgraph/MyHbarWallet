import { createLocalVue, shallowMount } from "@vue/test-utils";
import SwitchButton from "../../src/components/SwitchButton.vue";
import VueCompositionApi from "@vue/composition-api";

describe("SwitchButton.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(3);
        const handler = jest.fn();
        const wrapper = shallowMount(SwitchButton, {
            localVue,
            propsData: {
                checked: false
            },
            listeners: {
                change: handler
            }
        });

        const el = wrapper.find("input").element as HTMLInputElement;

        expect(el.checked).toBe(false);

        wrapper.trigger("click");

        expect(el.checked).toBe(true);
        expect(handler).toHaveBeenCalledTimes(1);
    });
});
