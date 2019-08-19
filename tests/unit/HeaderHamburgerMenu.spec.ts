import { createLocalVue, shallowMount } from "@vue/test-utils";
import HeaderHamburgerMenu from "../../src/components/HeaderHamburgerMenu.vue";
import { plugin as VueFunctionApi, computed } from "vue-function-api";
import Router from "vue-router";
import router from "../../src/router";

describe("HeaderHamburgerMenu.vue", (): void => {

    it("renders", (): void => {
        expect.assertions(1);
        const localVue = createLocalVue();
        localVue.use(Router);
        localVue.use(VueFunctionApi);
        const wrapper = shallowMount(HeaderHamburgerMenu, {
            localVue,
            router,
            methods: {
                inInterface: jest.fn(() => false)
            }
        });


        expect(wrapper.exists()).toBe(true);
    });

    it("opens with proper links", (): void => {
        expect.assertions(3);
        const localVue = createLocalVue();
        localVue.use(Router);
        localVue.use(VueFunctionApi);
        const wrapper = shallowMount(HeaderHamburgerMenu, {
            localVue,
            router,
            methods: {
                inInterface: jest.fn(() => true)
            }
        });

        expect(wrapper.find("nav").classes()).not.toContain("nav-open");
        wrapper.setProps({ isOpen: true });
        expect(wrapper.find("nav").classes()).toContain("nav-open");
        expect(wrapper.find(".card-container").exists()).toBe(true)
    });
});
