import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";

import InterfaceTokenBalances from "../../../src/ui/views/InterfaceTokenBalances.vue";
import i18n from "../../../src/service/i18n";
import router from "../../../src/ui/router";

describe("InterfaceTokenBalances.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);
    localVue.use(VueRouter);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(InterfaceTokenBalances, {
            localVue,
            i18n,
            router
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <interfaceform-stub title="Token Balances">
              <tokens-stub tokens=""></tokens-stub>
            </interfaceform-stub>
        `);
    });
});
