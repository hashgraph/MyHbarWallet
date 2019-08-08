import { mount, shallowMount } from "@vue/test-utils";
import MnemonicPhrase from "@/components/MnemonicInput.vue";

describe("MnemonicInput.vue", () => {
    const title = "Title";

    it("renders", () => {
        const wrapper = shallowMount(MnemonicPhrase);

        expect(wrapper.isVisible()).toBe(true);
    });
});
