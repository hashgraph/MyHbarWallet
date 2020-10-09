import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import AdBlockBuyHbar from "../../../src/ui/components/AdBlockBuyHbar.vue";
import i18n from "../../../src/service/i18n";

describe("AdBlockBuyHbar.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(AdBlockBuyHbar, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="AdBlockBuyHbar">
              <div class="AdBlockBuyHbar-follow">
                Buy Hbar with Credit Card
              </div>
              <div class="AdBlockBuyHbar-action"><button type="submit" class="outline compact">
                  <!----> <span>Buy Now</span>
                  <!---->
                </button> <img src="" class="AdBlockBuyHbar-icon"></div> <img src="" class="AdBlockBuyHbar-backdrop">
              <transition-stub name="fade">
                <!---->
              </transition-stub>
            </div>
        `);
    });
});
