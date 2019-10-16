import { createLocalVue, mount } from "@vue/test-utils";
import AccountCard from "../../../src/components/AccountCard.vue";
import VueCompositionApi from "@vue/composition-api";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("AccountCard.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(AccountCard, {
            localVue,
            i18n,
            propsData: {
                realm: 0,
                shard: 0,
                account: 305472
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="account"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" preserveAspectRatio="xMidYMid meet" class="account-image">
                <path fill="#545454" d="M20 12a4,4 0 1,1 8,0a4,4 0 1,1 -8,0M32 12a4,4 0 1,1 8,0a4,4 0 1,1 -8,0M32 48a4,4 0 1,1 8,0a4,4 0 1,1 -8,0M20 48a4,4 0 1,1 8,0a4,4 0 1,1 -8,0M8 24a4,4 0 1,1 8,0a4,4 0 1,1 -8,0M44 24a4,4 0 1,1 8,0a4,4 0 1,1 -8,0M44 36a4,4 0 1,1 8,0a4,4 0 1,1 -8,0M8 36a4,4 0 1,1 8,0a4,4 0 1,1 -8,0"></path>
                <path fill="#d1757a" d="M6 12L12 6L18 12L12 18ZM48 6L54 12L48 18L42 12ZM54 48L48 54L42 48L48 42ZM12 54L6 48L12 42L18 48ZM18 18L30 18L30 30L18 30ZM22.3 25.4a3.1,3.1 0 1,0 6.2,0a3.1,3.1 0 1,0 -6.2,0M42 18L42 30L30 30L30 18ZM31.4 25.4a3.1,3.1 0 1,0 6.2,0a3.1,3.1 0 1,0 -6.2,0M42 42L30 42L30 30L42 30ZM31.4 34.6a3.1,3.1 0 1,0 6.2,0a3.1,3.1 0 1,0 -6.2,0M18 42L18 30L30 30L30 42ZM22.3 34.6a3.1,3.1 0 1,0 6.2,0a3.1,3.1 0 1,0 -6.2,0"></path>
              </svg>
              <div class="content">
                <div class="top">
                  <div class="title">
                    Account
                  </div>
                  <div class="subtitle"><span>0.0.</span><strong>305472</strong></div>
                </div>
                <div class="actions">
                  <div class="tooltip-container action">
                    <div class="slot-container"><svg width="24" height="24" viewBox="0 0 24 24" class="qr-icon">
                        <path d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H11V13H9V11M15,11H17V13H19V11H21V13H19V15H21V19H19V21H17V19H13V21H11V17H15V15H17V13H15V11M19,19V15H17V19H19M15,3H21V9H15V3M17,5V7H19V5H17M3,3H9V9H3V3M5,5V7H7V5H5M3,15H9V21H3V15M5,17V19H7V17H5Z"></path>
                      </svg></div>
                    <div class="message">
                      Account QR Code
                    </div>
                  </div>
                  <!---->
                  <!---->
                </div>
              </div>
              <!---->
              <!---->
            </div>
        `);
    });
});
