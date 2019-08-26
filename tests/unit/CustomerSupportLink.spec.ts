import { shallowMount, createLocalVue } from "@vue/test-utils";
import CustomerSupportLink from "../../src/components/CustomerSupportLink.vue";
import VueCompositionApi from "@vue/composition-api";

describe("CustomerSupportLink.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(CustomerSupportLink, {
            localVue,
            propsData: {}
        });

        // todo: test something better? There isn't really anything else to test here :/
        expect(wrapper.text()).toMatch("Customer Support");
    });
});
