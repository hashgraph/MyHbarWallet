import { shallowMount } from "@vue/test-utils";
import HeaderHamburgerMenu from "../../src/components/HeaderHamburgerMenu.vue";
import HeaderHamburgerButton from "../../src/components/HeaderHamburgerButton.vue";

describe("HeaderHamburgerMenu.vue", () => {
    const wrapper = shallowMount(HeaderHamburgerMenu);

    it("renders", () => {
        expect(wrapper.isVisible()).toBeTruthy();
    });

    it("opens", () => {
        expect(wrapper.find("nav").classes()).not.toContain("nav-open");
        wrapper.setProps({ isOpen: true });
        expect(wrapper.find("nav").classes()).toContain("nav-open");
    });
});

describe("HeaderHamburgerButton.vue", () => {
    const wrapper = shallowMount(HeaderHamburgerButton);

    it("renders", () => {
        expect(wrapper.isVisible()).toBeTruthy();
    });

    it("triggers", () => {
        expect(wrapper.vm.$data.toggle).toBeFalsy();
        wrapper.find(".button-wrapper").trigger("click");
        expect(wrapper.vm.$data.toggle).toBeTruthy();
    });
});
