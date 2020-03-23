import { mount } from "@vue/test-utils";

import Features from "../../../src/ui/components/Features.vue";
import i18n from "../../../src/service/i18n";

describe("Features.vue", (): void => {
    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(Features, { i18n });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="features">
              <div class="wrap">
                <div class="feature-grid">
                  <div class="feature"><img alt="" class="image">
                    <div class="text">
                      <div class="header">
                        Join MyHbarWallet
                      </div>
                      <div class="content">
                        Access Hedera™ with the #1 Hbar Wallet with an elegant and easy-to-use interface.
                      </div>
                    </div>
                  </div>
                  <div class="feature"><img alt="" class="image">
                    <div class="text">
                      <div class="header">
                        Hardware Wallet Support
                      </div>
                      <div class="content">
                        MHW currently supports the Ledger Nano, and most major hardware wallets are on the development roadmap.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
