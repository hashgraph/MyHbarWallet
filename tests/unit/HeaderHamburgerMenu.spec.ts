import { createLocalVue, shallowMount } from "@vue/test-utils";
import HeaderHamburgerMenu from "../../src/components/HeaderHamburgerMenu.vue";
import HeaderHamburgerButton from "../../src/components/HeaderHamburgerButton.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("HeaderHamburgerMenu.vue", () => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    const wrapper = shallowMount(HeaderHamburgerMenu, {
        localVue
    });

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
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    const wrapper = shallowMount(HeaderHamburgerButton, {
        localVue,
        propsData: {
            isOpen: false
        }
    });

    it("renders", () => {
        expect(wrapper.isVisible()).toBeTruthy();
    });

    it("triggers", () => {
        wrapper.find(".button-wrapper").trigger("click")
        expect(wrapper.emitted()).toEqual({"toggle": [[true]]});
    
    });
});
