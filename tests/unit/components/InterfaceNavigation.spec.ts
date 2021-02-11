import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import InterfaceNavigation from "../../../src/ui/components/InterfaceNavigation.vue";
import i18n from "../../../src/service/i18n";

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
                      <path d="M15,4A8,8 0 0,1 23,12A8,8 0 0,1 15,20A8,8 0 0,1 7,12A8,8 0 0,1 15,4M15,18A6,6 0 0,0 21,12A6,6 0 0,0 15,6A6,6 0 0,0 9,12A6,6 0 0,0 15,18M3,12C3,14.61 4.67,16.83 7,17.65V19.74C3.55,18.85 1,15.73 1,12C1,8.27 3.55,5.15 7,4.26V6.35C4.67,7.17 3,9.39 3,12Z"></path>
                    </svg> <span class="nav-title">Crypto</span>
                    <transition-stub name="fade" mode="out-in"><svg width="24" height="24" viewBox="0 0 24 24" class="indicator">
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                      </svg></transition-stub>
                  </div>
                  <!---->
                </div>
                <div class="nav-section">
                  <div class="nav-section-header"><svg width="24" height="24" viewBox="0 0 24 24" class="icon" alt="">
                      <path d="M16,15H9V13H16V15M19,11H9V9H19V11M19,7H9V5H19V7M3,5V21H19V23H3A2,2 0 0,1 1,21V5H3M21,1A2,2 0 0,1 23,3V17C23,18.11 22.11,19 21,19H7A2,2 0 0,1 5,17V3C5,1.89 5.89,1 7,1H21M7,3V17H21V3H7Z"></path>
                    </svg> <span class="nav-title">Files</span>
                    <transition-stub name="fade" mode="out-in"><svg width="24" height="24" viewBox="0 0 24 24" class="indicator">
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                      </svg></transition-stub>
                  </div>
                  <!---->
                </div>
                <div class="nav-section">
                  <div class="nav-section-header"><svg width="24" height="24" viewBox="0 0 24 24" class="icon" alt="">
                      <path d="M9,5V6H15V5H9M22,18C22,18.53 21.79,19 21.4,19.41C21,19.81 20.55,20 20,20H4C3.45,20 3,19.81 2.6,19.41C2.21,19 2,18.53 2,18V14H7V15H9V14H15V15H17V14H22V18M4.5,7.22C4.84,6.41 5.45,6 6.33,6H7V5C7,4.45 7.18,4 7.57,3.59C7.96,3.2 8.44,3 9,3H15C15.56,3 16.04,3.2 16.43,3.59C16.82,4 17,4.45 17,5V6H17.67C18.55,6 19.16,6.41 19.5,7.22L21.58,12H17V11H15V12H9V11H7V12H2.42L4.5,7.22Z"></path>
                    </svg> <span class="nav-title">Tools</span>
                    <transition-stub name="fade" mode="out-in"><svg width="24" height="24" viewBox="0 0 24 24" class="indicator">
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                      </svg></transition-stub>
                  </div>
                  <!---->
                </div>
              </nav>
              <div class="side-nav-background menu-closed"></div>
            </div>
        `);
    });
});
