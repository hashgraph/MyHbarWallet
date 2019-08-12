import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import InterfaceNavigationSection from "../../src/components/InterfaceNavigationSection.vue";
import InterfaceNavigation from "../../src/components/InterfaceNavigation.vue";

describe("InterfaceNavigation", () => {
    const wrapper = shallowMount(InterfaceNavigation);
    it("renders with children components", () => {
        expect(wrapper.find(InterfaceNavigationSection).exists()).toBeTruthy();
    });
});
