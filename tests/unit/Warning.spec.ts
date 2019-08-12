import { shallowMount, createLocalVue } from "@vue/test-utils";
import Warning from "../../src/components/Warning.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("Warning.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    it("renders", (): void => {
        const title = "NOT RECOMMENDED";
        const wrapper = shallowMount(Warning, {
            propsData: { title },
            localVue,
        });

        expect(wrapper.isVisible()).toBe(true);
        expect(wrapper.text()).toMatch(title);
    });
});
