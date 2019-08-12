import { shallowMount, createLocalVue } from "@vue/test-utils";
import CustomerSupportLink from "../../src/components/CustomerSupportLink.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("CustomerSupportLink.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    it("renders", (): void => {
        const wrapper = shallowMount(CustomerSupportLink, {
            localVue,
            propsData: {}
        });

        // todo: test something better? There isn't really anything else to test here :/
        expect(wrapper.text()).toMatch("Customer Support");
    });
});
