import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import MnemonicInput from "../../src/components/MnemonicInput.vue";

describe("MnemonicInput.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders with 12 placeholders", (): void => {
        expect.assertions(2);
        const wrapper = shallowMount(MnemonicInput, {
            localVue,
            propsData: {
                words: 12,
                value: [],
                editable: true
            }
        });
        expect(wrapper.isVisible()).toBe(true);
        expect(wrapper.findAll("input")).toHaveLength(12);
    });

    it("adjusts mnemonic length", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(MnemonicInput, {
            localVue,
            propsData: {
                words: 24,
                value: [],
                editable: true
            }
        });
        expect(wrapper.findAll("label")).toHaveLength(24);
    });
});
