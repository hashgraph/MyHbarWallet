import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";

import InterfaceSendAsset from "../../../src/ui/views/InterfaceSendAsset.vue";
import i18n from "../../../src/service/i18n";
import router from "../../../src/ui/router";

describe("InterfaceSendAsset.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);
    localVue.use(VueRouter);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(InterfaceSendAsset, {
            localVue,
            i18n,
            router
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <interfaceform-stub title="Send Assets">
              <transferlist-stub transfers=""></transferlist-stub>
              <optionalmemofield-stub value=""></optionalmemofield-stub>
              <modaladdtransfer-stub state="[object Object]"></modaladdtransfer-stub>
              <modalsuccess-stub state="[object Object]">
                <div class="success">
                  <i18n-stub tag="span" path="modalSuccess.txId"><strong></strong></i18n-stub>
                </div>
              </modalsuccess-stub>
            </interfaceform-stub>
        `);
    });
});
