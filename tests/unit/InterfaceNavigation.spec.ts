import { createLocalVue, shallowMount } from "@vue/test-utils";
import InterfaceNavigationSection from "../../src/components/InterfaceNavigationSection.vue";
import InterfaceNavigation from "../../src/components/InterfaceNavigation.vue";
import VueCompositionApi from "@vue/composition-api";

describe("InterfaceNavigation", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders with children components", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(InterfaceNavigation, {
            localVue
        });
        expect(wrapper.find(InterfaceNavigationSection).exists()).toBe(true);
    });
});
