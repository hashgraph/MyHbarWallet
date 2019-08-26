import { shallowMount, createLocalVue } from "@vue/test-utils";
import Warning from "../../src/components/Warning.vue";
import VueCompositionApi from "@vue/composition-api";

describe("Warning.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(2);
        const title = "NOT RECOMMENDED";
        const wrapper = shallowMount(Warning, {
            propsData: {
                title
            },
            localVue
        });

        expect(wrapper.isVisible()).toBe(true);
        expect(wrapper.text()).toMatch(title);
    });
});
