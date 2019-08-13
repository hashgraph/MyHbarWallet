import { shallowMount, createLocalVue } from "@vue/test-utils";
import UnitConverter from "../../src/components/UnitConverter.vue";
import ConvertUnits from "../../src/views/ConvertUnits.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("UnitConverter.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    const wrapper = shallowMount(UnitConverter, { localVue });

    wrapper.setData({ valueLeft: "1000000000" });

    it("renders", (): void => {
        expect(wrapper.isVisible()).toBe(true);
    });

    it("calculates", (): void => {
        expect(wrapper.vm.$data.valueRight).toBe("10");
    });
});

describe("ConvertUnits.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);
    const wrapper = shallowMount(ConvertUnits, { localVue });

    it("renders", (): void => {
        expect(wrapper.isVisible()).toBe(true);
    });

    it("loads the data", (): void => {
        expect(wrapper.vm.$data.hbarUnitRef).toHaveLength(7);
    });
});
