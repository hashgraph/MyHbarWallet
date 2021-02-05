import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";

import InterfaceSendToken from "../../../src/ui/views/InterfaceSendToken.vue";
import i18n from "../../../src/service/i18n";
import router from "../../../src/ui/router";

describe("InterfaceSendToken.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);
    localVue.use(VueRouter);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(InterfaceSendToken, {
            localVue,
            i18n,
            router
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <interfaceform-stub title="Send Tokens">
              <notice-stub symbol="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z">
                No tokens are currently associated with your account.
              </notice-stub>
            </interfaceform-stub>
        `);
    });
});
