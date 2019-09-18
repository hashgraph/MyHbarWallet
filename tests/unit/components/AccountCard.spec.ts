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
                account: 305472,
                class: "info-account",
                publicKey:
                    "302a300506032b65700321002cc9e2d0c16c717476d4bbbfa3307a98cf0c41d7afc77c851e476b5921f3fb65"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="info-account"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" preserveAspectRatio="xMidYMid meet" class="account-image">
                <path fill="#e5e5e5" d="M18 18L18 6L30 6ZM30 6L42 6L42 18ZM42 42L42 54L30 54ZM30 54L18 54L18 42ZM6 30L6 18L18 18ZM42 18L54 18L54 30ZM54 30L54 42L42 42ZM18 42L6 42L6 30Z"></path>
                <path fill="#ccb066" d="M12 18L6 12L12 6L18 12ZM42 12L48 6L54 12L48 18ZM48 42L54 48L48 54L42 48ZM18 48L12 54L6 48L12 42ZM18 18L30 18L30 30L18 30ZM21 25.5L25.5 30L30 25.5L25.5 21ZM42 18L42 30L30 30L30 18ZM34.5 21L30 25.5L34.5 30L39 25.5ZM42 42L30 42L30 30L42 30ZM39 34.5L34.5 30L30 34.5L34.5 39ZM18 42L18 30L30 30L30 42ZM25.5 39L30 34.5L25.5 30L21 34.5Z"></path>
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
                  <div class="tooltip-container action">
                    <div class="slot-container"><svg width="24" height="24" viewBox="0 0 24 24" class="copy-icon">
                        <path d="M7,14A2,2 0 0,1 5,12A2,2 0 0,1 7,10A2,2 0 0,1 9,12A2,2 0 0,1 7,14M12.65,10C11.83,7.67 9.61,6 7,6A6,6 0 0,0 1,12A6,6 0 0,0 7,18C9.61,18 11.83,16.33 12.65,14H17V18H21V14H23V10H12.65Z"></path>
                      </svg></div>
                    <div class="message">
                      Public Key
                    </div>
                  </div>
                </div>
              </div>
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Account ID</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                    </svg></header>
                  <div class="main">
                    <div class="content-container">
                      <div class="modal-contents">
                        <div value="0.0.305472" level="L" background="#fff" foreground="#000" class="pub-qr"><canvas height="200" width="200" style="width: 200px; height: 200px;"></canvas></div>
                        <div class="read-only-input account-id">
                          <div class="value">0.0.305472</div>
                        </div> <button type="submit" class="button compact"><span>Copy Account ID</span>
                          <!----></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="view-public-key">
                <div role="dialog" aria-modal="true" class="modal-background">
                  <div class="modal">
                    <header><span class="title">Public Key</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <div class="main">
                      <div class="content-container">
                        <div class="read-only-input">
                          <div class="">302a300506032b65700321002cc9e2d0c16c717476d4bbbfa3307a98cf0c41d7afc77c851e476b5921f3fb65</div>
                        </div>
                        <div class="container"><button type="submit" class=""><span>Copy</span>
                            <!----></button></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
