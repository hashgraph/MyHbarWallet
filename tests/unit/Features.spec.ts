import { shallowMount } from "@vue/test-utils";
import Features from "../../src/components/Features.vue";
import Feature from "../../src/components/Feature.vue";

describe("Features.vue", (): void => {
    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(Features);

        expect(wrapper.findAll(Feature)).toHaveLength(2);
    });
});
