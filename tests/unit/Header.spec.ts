import { shallowMount, createLocalVue } from "@vue/test-utils";
import Header from "../../src/components/Header.vue";
import VueRouter from "vue-router";
import router from "../../src/router";
import { plugin as VueFunctionApi } from "vue-function-api";
import "../../src/directives";

describe("Header.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(VueFunctionApi);

    it("renders", (): void => {
        const wrapper = shallowMount(Header, {
            localVue,
            router
        });

        expect(wrapper.text()).toMatch("MyHederaWallet  Home About FAQs");
    });
});
