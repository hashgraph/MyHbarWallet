import { shallowMount } from "@vue/test-utils";
import InterfaceNavigationSection from "../../src/components/InterfaceNavigationSection.vue";
import InterfaceNavigation from "../../src/components/InterfaceNavigation.vue";

describe("InterfaceNavigation", (): void => {
    it("renders with children components", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(InterfaceNavigation);
        expect(wrapper.find(InterfaceNavigationSection).exists()).toBe(true);
    });
});
