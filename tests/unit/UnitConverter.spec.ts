import { mount, shallowMount } from "@vue/test-utils";
import UnitConverter from "../../src/components/UnitConverter.vue";
import ConvertUnits from "../../src/views/ConvertUnits.vue";

describe("UnitConverter.vue", () => {
    const wrapper = shallowMount(UnitConverter);

    wrapper.setData({ valueLeft: "1000000000" });

    it("renders", () => {
        expect(wrapper.isVisible()).toBeTruthy();
    });

    it("calculates", () => {
        expect(wrapper.vm.$data.valueRight).toBe("10");
    });
});
describe("ConvertUnits.vue", () => {
    const wrapper = shallowMount(ConvertUnits);

    it("renders", () => {
        expect(wrapper.isVisible()).toBeTruthy();
    });

    it("Loads the data", () => {
        expect(wrapper.vm.$data.hbarUnitRef.length).toBe(7);
    });
});
