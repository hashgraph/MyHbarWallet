import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import Home from "../../../src/ui/views/Home.vue";
import i18n from "../../../src/service/i18n";

describe("Home.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(Home, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="home">
              <div class="top">
                <div class="page-container">
                  <div class="banner">
                    <div class="banner-content">
                      <div class="title">
                        The #1 Hbar Wallet
                      </div>
                      <div class="subtitle">
                        MyHbarWallet is a free, client-side interface helping you interact with Hedera™ Hashgraph. Our easy-to-use, open-source platform allows you to generate keys, create accounts, transfer hbars, and so much more.
                      </div>
                    </div>
                    <div class="banner-image"><img src="" alt="banner"></div>
                  </div>
                  <hometilebuttons-stub></hometilebuttons-stub>
                </div>
              </div> <img src="" alt="circle" class="circle">
              <div id="about" class="about">
                <div class="page-container">
                  <div class="about-banner">
                    <div class="banner-content">
                      <div class="about-title">
                        About MyHbarWallet
                      </div>
                      <div class="about-subtitle">
                        MyHbarWallet is a clone of one of the most popular wallets on Ethereum. We took that approach because it was open source and people already are familiar with the interface and processes. We want MyHbarWallet to be the simplest and most intuitive interface to Hedera™ Hashgraph.
                      </div>
                    </div> <img src="" alt="about" class="about-image">
                  </div>
                </div>
              </div>
              <features-stub></features-stub>
              <faqs-stub></faqs-stub>
              <!---->
              <modalwelcome-stub></modalwelcome-stub>
            </div>
        `);
    });
});
