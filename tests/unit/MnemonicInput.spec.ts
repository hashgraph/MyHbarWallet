import { mount, shallowMount } from "@vue/test-utils";
import MnemonicInput from "@/components/MnemonicInput.vue";

describe("MnemonicInput.vue", () => {
    it("renders with 12 placeholders", () => {
        const wrapper = shallowMount(MnemonicInput, {
            propsData: {
                words: 12,
                value: [],
                editable: true
            }
        });

        expect(wrapper.isVisible()).toBe(true);
        expect(wrapper.findAll("input")).toHaveLength(12);
    });
});
