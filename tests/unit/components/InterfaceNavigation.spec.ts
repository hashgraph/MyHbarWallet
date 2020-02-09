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
                  <div class="nav-section-header"><svg width="24" height="24" viewBox="0 0 24 24" class="icon" alt="">
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z"></path>
                    </svg> <span class="nav-title">Crypto</span> <svg width="24" height="24" viewBox="0 0 24 24" class="indicator">
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                    </svg></div>
                  <!---->
                </div>
                <div class="nav-section">
                  <div class="nav-section-header"><svg width="24" height="24" viewBox="0 0 24 24" class="icon" alt="">
                      <path d="M16,15H9V13H16V15M19,11H9V9H19V11M19,7H9V5H19V7M3,5V21H19V23H3A2,2 0 0,1 1,21V5H3M21,1A2,2 0 0,1 23,3V17C23,18.11 22.11,19 21,19H7A2,2 0 0,1 5,17V3C5,1.89 5.89,1 7,1H21M7,3V17H21V3H7Z"></path>
                    </svg> <span class="nav-title">Files</span> <svg width="24" height="24" viewBox="0 0 24 24" class="indicator">
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
