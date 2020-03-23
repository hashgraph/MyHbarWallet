import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";

import AccessMyAccount from "../../../src/ui/views/AccessMyAccount.vue";
import i18n from "../../../src/service/i18n";
import router from "../../../src/ui/router";

describe("AccessMyAccount.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);
    localVue.use(VueRouter);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(AccessMyAccount, {
            localVue,
            i18n,
            router
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="access-my-account">
              <div class="wrap">
                <pagetitle-stub title="Access My Account">
                  Don't have an account?
                  <router-link-stub to="[object Object]" tag="a" event="click">
                    Create a new account
                  </router-link-stub>
                </pagetitle-stub>
                <accounttilebuttons-stub></accounttilebuttons-stub>
              </div>
              <faqs-stub></faqs-stub>
              <modalaccessbyprivatekey-stub state="[object Object]"></modalaccessbyprivatekey-stub>
              <modalaccessbyphrase-stub state="[object Object]"></modalaccessbyphrase-stub>
              <modalaccessbyhardware-stub state="[object Object]"></modalaccessbyhardware-stub>
              <modalaccessbysoftware-stub></modalaccessbysoftware-stub>
              <modalkeystorefilepassword-stub state="[object Object]"></modalkeystorefilepassword-stub>
              <modalenteraccountid-stub state="[object Object]"></modalenteraccountid-stub>
              <modalrequesttocreateaccount-stub></modalrequesttocreateaccount-stub> <input id="file-upload" type="file" style="display: none;">
            </div>
        `);
    });
});
