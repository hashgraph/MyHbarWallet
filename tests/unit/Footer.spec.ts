import { shallowMount, createLocalVue } from "@vue/test-utils";
import Footer from "@/components/Footer.vue";
import { plugin as VueFunctionApi } from "vue-function-api";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import FooterTop from "@/components/FooterTop.vue";
import VueRouter from "vue-router";

describe("Footer.vue", (): void => {
    it("renders and contains footer information", (): void => {
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

        expect(wrapper.isVisible()).toBeTruthy();
        expect(wrapper.find(".copyright").text()).toContain(year.toString());
        expect(wrapper.text().includes("Terms")).toBeTruthy();
        expect(wrapper.text().includes("Privacy")).toBeTruthy();
    });
});
