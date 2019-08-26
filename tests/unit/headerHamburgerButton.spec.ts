import { createLocalVue, shallowMount } from "@vue/test-utils";
import HeaderHamburgerButton from "../../src/components/HeaderHamburgerButton.vue";
import VueCompositionApi from "@vue/composition-api";

describe("HeaderHamburgerButton.vue", (): void => {
    it("renders", (): void => {
        const localVue = createLocalVue();
        localVue.use(VueCompositionApi);
        const wrapper = shallowMount(HeaderHamburgerButton, {
            localVue,
            propsData: {
                isOpen: false
            }
        });

        expect.assertions(1);
        expect(wrapper.isVisible()).toBe(true);
    });

    it("triggers", (): void => {
        const localVue = createLocalVue();
        localVue.use(VueCompositionApi);

        const wrapper = shallowMount(HeaderHamburgerButton, {
            localVue,
            propsData: {
                isOpen: false
            }
        });

        expect.assertions(1);
        wrapper.find(".button-wrapper").trigger("click");
        expect(wrapper.emitted().toggle).toStrictEqual([[true]]);
    });
});
