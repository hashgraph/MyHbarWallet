import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";

import Interface from "../../../src/ui/views/Interface.vue";
import i18n from "../../../src/service/i18n";
import router from "../../../src/ui/router";

describe("Interface.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);
    localVue.use(VueRouter);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(Interface, {
            localVue,
            i18n,
            router
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="interface">
              <interfacenavigation-stub></interfacenavigation-stub>
              <div class="main-container">
                <div class="main">
                  <router-view-stub name="default"></router-view-stub>
                </div>
                <div class="interface-ads">
                  <!---->
                  <adblocktwitter-stub></adblocktwitter-stub>
                </div>
                <!---->
                <balancecard-stub class="info-balance"></balancecard-stub>
                <networkcard-stub class="info-network"></networkcard-stub>
              </div>
            </div>
        `);
    });
});
