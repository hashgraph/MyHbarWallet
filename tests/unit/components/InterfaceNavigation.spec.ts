import { createLocalVue, mount } from "@vue/test-utils";
import InterfaceNavigation from "../../../src/components/InterfaceNavigation.vue";
import VueCompositionApi from "@vue/composition-api";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("InterfaceNavigation", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(InterfaceNavigation, {
            localVue,
            i18n
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div>
              <div class="side-nav-top menu-closed"><img alt="" src="../assets/myhbarwallet-logo.svg" class="logo"> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                </svg></div>
              <nav class="menu-closed">
                <div class="nav-section">
                  <div class="nav-section-header"><img alt="" src=""> <span class="nav-title">Crypto</span> <svg width="24" height="24" viewBox="0 0 24 24" class="indicator" name="fade" mode="out-in">
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                    </svg></div>
                  <!---->
                </div>
                <!---->
                <!---->
              </nav>
              <div class="side-nav-background menu-closed"></div>
            </div>
        `);
    });
});
