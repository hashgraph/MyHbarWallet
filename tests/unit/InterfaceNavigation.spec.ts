import { shallowMount } from "@vue/test-utils";
import InterfaceNavigationSection from "../../src/components/InterfaceNavigationSection.vue";
import InterfaceNavigation from "../../src/components/InterfaceNavigation.vue";

describe("InterfaceNavigation", (): void => {
    const wrapper = shallowMount(InterfaceNavigation);
    it("renders with children components", (): void => {
        expect(wrapper.find(InterfaceNavigationSection).exists()).toBeTruthy();
    });
});
