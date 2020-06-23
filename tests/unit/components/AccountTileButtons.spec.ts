import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import AccountTileButtons from "../../../src/ui/components/AccountTileButtons.vue";
import i18n from "../../../src/service/i18n";

describe("AccountTileButtons.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(AccountTileButtons, {
            localVue,
            i18n
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="tile-grid">
              <div class="account-tile-button"><img src="" class="tile-image">
                <div class="text">
                  <div class="title">
                    Hardware
                  </div>
                  <div class="content">
                    Ledger Nano
                  </div>
                  <div class="note">

                  </div>
                </div>
              </div>
              <div class="account-tile-button"><img src="" class="tile-image">
                <div class="text">
                  <div class="title">
                    Software
                  </div>
                  <div class="content">
                    Keystore file, Private key, Mnemonic phrase
                  </div>
                  <div class="note">

                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
