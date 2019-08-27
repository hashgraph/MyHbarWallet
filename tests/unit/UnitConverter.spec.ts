import { shallowMount, createLocalVue } from "@vue/test-utils";
import UnitConverter from "../../src/components/UnitConverter.vue";
import ConvertUnits from "../../src/views/ConvertUnits.vue";
import VueCompositionApi from "@vue/composition-api";
import Vue from "vue";

describe("UnitConverter.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    const wrapper = shallowMount(UnitConverter, {
        localVue
    });

    wrapper.setData({
        valueLeft: "1000000000"
    });

    it("renders", (): void => {
        expect.assertions(1);
        expect(wrapper.isVisible()).toBe(true);
    });

    it("calculates different values and changes", (): void => {
        expect.assertions(7);
        expect((wrapper.vm as Vue).$data.valueRight).toBe("10");
        wrapper.setData({
            selectedLeft: "gigabar",
            valueLeft: "1000",
            selectedRight: "hbar"
        });
        expect((wrapper.vm as Vue).$data.valueRight).toBe("1000000000000");
        wrapper.setData({
            selectedLeft: "tinybar",
            valueLeft: "1000",
            selectedRight: "hbar"
        });
        expect((wrapper.vm as Vue).$data.valueRight).toBe("0.00001");
        wrapper.setData({
            selectedLeft: "gigabar",
            valueLeft: "1000",
            selectedRight: "tinybar"
        });
        expect((wrapper.vm as Vue).$data.valueRight).toBe("1000000000000");
        wrapper.setData({
            selectedLeft: "gigabar",
            valueLeft: "1000",
            selectedRight: "millibar"
        });
        expect((wrapper.vm as Vue).$data.valueRight).toBe(
            "100000000000000000000"
        );
        wrapper.setData({
            selectedRight: "kilobar"
        });
        expect((wrapper.vm as Vue).$data.valueLeft).toBe("100000000000000");
        wrapper.setData({
            selectedLeft: "microbar"
        });
        expect((wrapper.vm as Vue).$data.valueRight).toBe("100000");
    });
});

describe("ConvertUnits.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    const wrapper = shallowMount(ConvertUnits, {
        localVue
    });

    it("renders", (): void => {
        expect.assertions(1);
        expect(wrapper.isVisible()).toBe(true);
    });

    it("loads the data", (): void => {
        expect.assertions(1);
        expect((wrapper.vm as Vue).$data.hbarUnitRef).toHaveLength(7);
    });
});
