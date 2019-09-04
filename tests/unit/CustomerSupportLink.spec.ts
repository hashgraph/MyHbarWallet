import { createLocalVue, shallowMount } from "@vue/test-utils";
import CustomerSupportLink from "../../src/components/CustomerSupportLink.vue";
import VueCompositionApi from "@vue/composition-api";

describe("CustomerSupportLink.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const wrapper = shallowMount(CustomerSupportLink, {
            localVue,
            propsData: {}
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="customer-support-link"><img alt="" src=""> Customer Support
              <modalcustomerservice-stub></modalcustomerservice-stub>
            </div>
        `);
    });
});
