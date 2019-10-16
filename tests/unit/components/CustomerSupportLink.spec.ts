import { createLocalVue, mount } from "@vue/test-utils";
import CustomerSupportLink from "../../../src/components/CustomerSupportLink.vue";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import i18n from "../../../src/i18n";

describe("CustomerSupportLink.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(CustomerSupportLink, {
            localVue,
            i18n,
            propsData: {}
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="customer-support-link">
              <div class="customer-support-container"><img alt="" src="">Customer Support
              </div>
              <!---->
            </div>
        `);
    });
});
