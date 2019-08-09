import { shallowMount } from "@vue/test-utils";
import Features from "../../src/components/Features.vue";
import Feature from "../../src/components/Feature.vue";

describe("Features.vue", () => {
    it("renders", () => {
        const wrapper = shallowMount(Features);

        expect(wrapper.findAll(Feature)).toHaveLength(2);
    });
});
