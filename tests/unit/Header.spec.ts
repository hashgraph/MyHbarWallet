import { shallowMount, createLocalVue } from "@vue/test-utils";
import Header from "../../src/components/Header.vue";
import VueRouter from "vue-router";
import router from "../../src/router";
import VueCompositionApi from "@vue/composition-api";
import "../../src/directives";

describe("Header.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(Header, {
            localVue,
            router
        });

        expect(wrapper.text()).toMatch("MyHbarWallet  Home About FAQs");
    });
});
