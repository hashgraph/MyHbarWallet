import { shallowMount, createLocalVue } from "@vue/test-utils";
import Footer from "../../src/components/Footer.vue";
import { plugin as VueFunctionApi } from "vue-function-api";
import MaterialDesignIcon from "../../src/components/MaterialDesignIcon.vue";
import FooterTop from "../../src/components/FooterTop.vue";
import VueRouter from "vue-router";

describe("Footer.vue", (): void => {
    it("renders and contains footer information", (): void => {
        expect.assertions(4);

        const localVue = createLocalVue();
        localVue.use(VueRouter);
        localVue.use(VueFunctionApi);

        const wrapper = shallowMount(Footer, {
            localVue,
            components: {
                MaterialDesignIcon,
                FooterTop
            }
        });

        const year = new Date().getFullYear();

        expect(wrapper.isVisible()).toBe(true);
        expect(wrapper.find(".copyright").text()).toContain(year.toString());
        expect(wrapper.text()).toContain("Terms");
        expect(wrapper.text()).toContain("Privacy");
    });
});
