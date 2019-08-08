import { shallowMount } from "@vue/test-utils";
import HeaderHamburgerMenu from "../../src/components/HeaderHamburgerMenu.vue";
import HeaderHamburgerButton from "../../src/components/HeaderHamburgerButton.vue";

describe("HeaderHamburgerMenu.vue", () => {
    const wrapper = shallowMount(HeaderHamburgerMenu);

    it("renders", () => {
        expect(wrapper.isVisible()).toBe(true);
    });

    it("opens", () => {
        wrapper.setProps({ isOpen: true });
        expect(wrapper.find("nav").isVisible()).toBe(true);
    });
});

describe("HeaderHamburgerButton.vue", () => {
    const wrapper = shallowMount(HeaderHamburgerButton);

    it("renders", () => {
        expect(wrapper.isVisible()).toBe(true);
    });

    it("triggers", () => {
        wrapper.find(".button-wrapper").trigger("click");
        expect(wrapper.vm.$data.toggle).toBe(true);
    });
});
