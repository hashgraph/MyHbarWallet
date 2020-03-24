import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import HardwareWalletOffer from "../../../src/ui/components/HardwareWalletOffer.vue";
import i18n from "../../../src/service/i18n";

describe("HardwareWalletOffer.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(HardwareWalletOffer, {
            localVue,
            i18n,
            propsData: {
                description: "description",
                image: "https://via.placeholder.com/150",
                cost: "999",
                currency: "gil",
                moreInfo: "more Info"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="hardware-wallet-offer">
              <div class="offer-description">
                <div class="starting-from">
                  Starting From
                </div>
                <div class="cost-container">
                  gil<span class="cost">999</span></div>
                <div class="description-text">
                  description
                </div> <a rel="noopener" target="_blank" href="more Info" class="green-link">
                  More information &gt;
                </a>
              </div> <a href="more Info" rel="noopener" target="_blank"><img src="https://via.placeholder.com/150" class="logo-image"></a>
            </div>
        `);
    });
});
