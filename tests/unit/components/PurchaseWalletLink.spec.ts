import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";

import PurchaseWalletLink from "../../../src/ui/components/PurchaseWalletLink.vue";
import i18n from "../../../src/service/i18n";
import router from "../../../src/ui/router";

describe("PurchaseWalletLink.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueRouter);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(PurchaseWalletLink, {
            localVue,
            router,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="hardware-link"><a href="/hardware-wallet-affiliates" class="">
                Purchase a hardware wallet
              </a>
              for the highest security when accessing your crypto.
            </div>
        `);
    });
});
