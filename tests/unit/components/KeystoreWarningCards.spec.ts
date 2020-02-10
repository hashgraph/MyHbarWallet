import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import KeystoreWarningCards from "../../../src/components/KeystoreWarningCards.vue";
import i18n from "../../../src/i18n";

describe("KeystoreWarningCards.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(KeystoreWarningCards, {
            localVue,
            i18n
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="save-my-keystore-cards"><span class="body-title">Save This Keystore File!</span>
              <div class="card"><img src="" alt="" class="card-image">
                <div class="card-body-wrapper"><span class="card-header">Don't Lose It</span>
                  <p class="card-body">
                    Be careful, it can not be recovered if you lose it.
                  </p>
                </div>
              </div>
              <div class="card"><img src="" alt="" class="card-image">
                <div class="card-body-wrapper"><span class="card-header">Don't Share It</span>
                  <p class="card-body">
                    Your funds will be stolen if you use this file on a malicious phishing site.
                  </p>
                </div>
              </div>
              <div class="card"><img src="" alt="" class="card-image">
                <div class="card-body-wrapper"><span class="card-header">Make a Backup</span>
                  <p class="card-body">
                    Secure it like the millions of dollars it may one day be worth.
                  </p>
                </div>
              </div>
            </div>
        `);
    });
});
