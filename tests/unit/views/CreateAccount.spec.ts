import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";

import CreateAccount from "../../../src/ui/views/CreateAccount.vue";
import i18n from "../../../src/service/i18n";
import router from "../../../src/ui/router";

describe("CreateAccount.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);
    localVue.use(VueRouter);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(CreateAccount, {
            localVue,
            i18n,
            router
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="create-account">
              <div class="wrap">
                <pagetitle-stub title="Create A New Account">
                  Already Have One?
                  <router-link-stub to="[object Object]" tag="a" ariacurrentvalue="page" event="click">
                    Access My Account
                  </router-link-stub>
                </pagetitle-stub>
                <accounttilebuttons-stub></accounttilebuttons-stub>
              </div>
              <faqs-stub></faqs-stub>
              <modalaccessbyhardware-stub state="[object Object]"></modalaccessbyhardware-stub>
              <modalcreatebysoftware-stub></modalcreatebysoftware-stub>
              <modalcreatebyphrase-stub></modalcreatebyphrase-stub>
              <modalcreatebykeystore-stub state="[object Object]"></modalcreatebykeystore-stub>
              <modaldownloadkeystore-stub state="[object Object]"></modaldownloadkeystore-stub>
              <modalenteraccountid-stub state="[object Object]"></modalenteraccountid-stub>
              <modalrequesttocreateaccount-stub></modalrequesttocreateaccount-stub>
            </div>
        `);
    });
});
