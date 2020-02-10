import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";

import FooterTop from "../../../src/components/FooterTop.vue";
import i18n from "../../../src/i18n";

describe("FooterTop.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueRouter);
    localVue.use(VueI18n);
    const router = new VueRouter();

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(FooterTop, {
            localVue,
            i18n,
            router
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="footer-top">
              <div class="section">
                <div class="title">
                  Discover
                </div>
                <div class="item"><a href="#/" class="link router-link-exact-active router-link-active">
                    Units
                  </a></div>
                <div class="item"><a href="#/" class="link router-link-exact-active router-link-active">
                    Buy a Hardware Wallet
                  </a></div>
              </div>
              <div class="section">
                <div class="title">
                  Affiliates
                </div>
                <div class="item"><a href="https://shop.ledger.com/pages/ledger-nano-x?r=0d2e5ed943aa" rel="noopener" target="_blank" class="link">
                    Ledger
                  </a></div>
                <div class="item"><a href="https://shop.trezor.io/?offer_id=10&amp;aff_id=3302" rel="noopener" target="_blank" class="link">
                    Trezor
                  </a></div>
                <!---->
                <!---->
                <!---->
                <!---->
                <!---->
                <!---->
                <!---->
              </div>
              <div class="section">
                <div class="title">
                  MyHbarWallet
                </div>
                <div class="item"><a href="#/#about" class="link">
                    About
                  </a></div>
                <div class="item"><a href="#/#faqs" class="link">
                    FAQs
                  </a></div>
                <div class="item customer-service">
                  Customer Support
                </div>
              </div>
              <div class="section">
                <div class="title"><span>Love <img src="../assets/heart.svg" class="love"> MHW? Donate!</span></div>
                <div class="item">
                  MyHbarWallet is open-source and free to the community. Your donations go a long way towards making that possible.
                </div>
                <div class="donation"><img src="" class="hbar-icon">
                  0.0.1001
                </div>
              </div>
              <!---->
            </div>
        `);
    });
});
