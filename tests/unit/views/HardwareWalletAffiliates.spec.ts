import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import HardwareWalletAffiliates from "../../../src/ui/views/HardwareWalletAffiliates.vue";
import i18n from "../../../src/service/i18n";

describe("HardwareWalletAffiliates.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(HardwareWalletAffiliates, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="hardware-wallet-affiliates">
              <pagetitle-stub title="Buy a Hardware Wallet" large="true">
                Purchase a hardware wallet for the highest security when accessing your crypto.
              </pagetitle-stub>
              <div class="offers">
                <hardwarewalletoffer-stub description="A light, yet solid multicurrency hardware wallet for cryptocurrencies. It is easy to carry everywhere thanks to its USB format." image="" cost="59" currency="$" moreinfo="https://shop.ledger.com/pages/ledger-nano-x?r=0d2e5ed943aa"></hardwarewalletoffer-stub>
                <hardwarewalletoffer-stub description="The most trusted hardware wallet in the world. Get yours today!" image="" cost="55" currency="$" moreinfo="https://shop.trezor.io/?offer_id=10&amp;aff_id=3302"></hardwarewalletoffer-stub>
                <!---->
                <!---->
                <!---->
                <!---->
                <!---->
                <!---->
                <!---->
              </div>
            </div>
        `);
    });
});
