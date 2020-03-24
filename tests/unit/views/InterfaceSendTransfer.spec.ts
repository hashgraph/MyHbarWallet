import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import InterfaceSendTransfer from "../../../src/ui/views/InterfaceSendTransfer.vue";
import i18n from "../../../src/service/i18n";

describe("InterfaceSendTransfer.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(InterfaceSendTransfer, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <interfaceform-stub title="Send">
              <textinput-stub value="" label="Amount" showvalidation="true" error="" suffix="hbar" has-input=""></textinput-stub>
              <idinput-stub error="" cancopy="true" label="To Account" show-validation=""></idinput-stub>
              <optionalmemofield-stub value=""></optionalmemofield-stub>
              <modalsuccess-stub state="[object Object]">
                <i18n-stub path="modalSuccess.transferred"><strong>0</strong> <strong></strong></i18n-stub>
              </modalsuccess-stub>
              <modalfeesummary-stub state="[object Object]"></modalfeesummary-stub>
            </interfaceform-stub>
        `);
    });
});
