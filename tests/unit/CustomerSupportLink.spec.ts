import { shallowMount } from "@vue/test-utils";
import CustomerSupportLink from "../../src/components/CustomerSupportLink.vue";

describe('CustomerSupportLink.vue', () => {
    it("renders", () => {
        const wrapper = shallowMount(CustomerSupportLink, {
            propsData: {}
        });

        // todo: test something better? There isn't really anything else to test here :/
        expect(wrapper.text()).toMatch("Customer Support");
    })
})