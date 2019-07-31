import { shallowMount, createLocalVue } from "@vue/test-utils";
import Header from "../../src/components/Header.vue";
import VueRouter from "vue-router";
import router from "../../src/router";
import "../../src/directives";

describe("Header.vue", () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter);

    it("renders", () => {
        const wrapper = shallowMount(Header, {
            localVue,
            router
        });

        expect(wrapper.text()).toMatch("MyHederaWallet  Home About FAQs");
    });
});
