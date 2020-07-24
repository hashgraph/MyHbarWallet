import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import InterfaceCreateAccount from "../../../src/ui/views/InterfaceCreateAccount.vue";
import i18n from "../../../src/service/i18n";

describe("InterfaceCreateAccount.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(InterfaceCreateAccount, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <interfaceform-stub title="Create Account">
              <notice-stub symbol="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z">
                To create an account, you need the public key of the person requesting an account.
              </notice-stub>
              <textinput-stub value="" label="Initial Balance" min="1" showvalidation="true" error="" suffix="hbar" has-input=""></textinput-stub>
              <textinput-stub value="" label="Public Key" autocompletedisabled="true" spellcheckdisabled="true" showvalidation="true" error=""></textinput-stub>
              <modalsuccess-stub state="[object Object]">
                <div class="success">
                  <i18n-stub tag="span" path="modalSuccess.txId"><strong></strong></i18n-stub>
                  <i18n-stub tag="span" path="modalSuccess.createdAccount"><span><strong></strong></span> <strong></strong></i18n-stub>
                </div>
              </modalsuccess-stub>
              <modalfeesummary-stub state="[object Object]"></modalfeesummary-stub>
            </interfaceform-stub>
        `);
    });
});
