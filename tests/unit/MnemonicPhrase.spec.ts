import { mount, shallowMount } from "@vue/test-utils";
import MnemonicPhrase from "@/components/MnemonicPhrase.vue";

describe("MnemonicPhrase.vue", () => {
    const title = "Title";

    it("renders", () => {
        const wrapper = shallowMount(MnemonicPhrase);

        expect(wrapper.isVisible()).toBe(true);
    });
});
