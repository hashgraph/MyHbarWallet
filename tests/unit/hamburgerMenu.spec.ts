import { shallowMount } from "@vue/test-utils";
import HamburgerMenu from "@/components/HamburgerMenu.vue";
import HamburgerButton from "@/components/HamburgerButton.vue";

describe("HamburgerMenu.vue", () => {
    const wrapper = shallowMount(HamburgerMenu);

    it("renders", () => {
        expect(wrapper.isVisible()).toBe(true);
    });

    it("opens",  () => {
        wrapper.setProps({isOpen: true})
        expect(wrapper.find("nav").isVisible()).toBe(true);
    })
});

describe("HamburgerButton.vue", () => {
    const wrapper = shallowMount(HamburgerButton);

    it("renders", () => {
        expect(wrapper.isVisible()).toBe(true)
    })
    
    it("triggers", () => {
        wrapper.find(".button-wrapper").trigger('click')
        expect(wrapper.vm.$data.toggle).toBe(true);
    })
});