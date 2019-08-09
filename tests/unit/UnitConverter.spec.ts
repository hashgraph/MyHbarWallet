import { mount, shallowMount } from "@vue/test-utils";
import UnitConverter from "../../src/components/UnitConverter.vue";

describe("UnitConverter.vue", () => {
    const wrapper = shallowMount(UnitConverter);

    it("renders", () => {
        expect(wrapper.isVisible()).toBe(true);
    });
});
