import { createLocalVue, mount } from "@vue/test-utils";
import FAQs from "../../../src/components/FAQs.vue";
import VueCompositionApi from "@vue/composition-api";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("FAQs.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(FAQs, {
            localVue,
            i18n
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div id="faqs" class="faqs">
              <div class="wrap">
                <div class="page-container">
                  <div class="head">
                    <div class="title">
                      <div class="title-text">FAQs</div>
                      <div class="subtitle-text">
                        Answers to most frequently asked questions.
                      </div>
                    </div>
                    <div class="customer-support-link customer-support-link">
                      <div class="customer-support-container"><img alt="" src="">Customer Support
                      </div>
                      <div role="dialog" aria-modal="true" class="modal-background">
                        <div class="modal">
                          <header><span class="title">Issue Information</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                            </svg></header>
                          <div class="main">
                            <div class="content-container">
                              <form class="modal-issue-information">
                                <!---->
                                <!---->
                                <div class="text-input issue-item"><label class="label-container">
                                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Device/Wallet type (if any)" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><!----></div></div></span>
                                    <!----></span></label>
                                  <!---->
                                  <!---->
                                </div>
                                <div class="text-input issue-item"><label class="label-container">
                                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Account ID (if any)" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><!----></div></div></span>
                                    <!----></span></label>
                                  <!---->
                                  <!---->
                                </div>
                                <div class="text-input issue-item"><label class="label-container">
                                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="URL" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><!----></div></div></span>
                                    <!----></span></label>
                                  <!---->
                                  <!---->
                                </div>
                                <div class="text-input issue-item is-multiline"><label class="label-container">
                                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><textarea placeholder="Describe the issue" rows="8" class="text-area resize"></textarea></div> <div class="deco-flex-item"><!----></div></div></span>
                                    <!----></span></label>
                                  <!---->
                                  <!---->
                                </div> <button type="submit" class="send-button compact"><span>Send</span>
                                  <!----></button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="cards">
                    <div class="accordion">
                      <div class="title">
                        <div class="title-text">
                          How do I create a new account?
                        </div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                          <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
                        </svg>
                      </div>
                      <div class="content">
                        <div class="content-text">
                          MyHbarWallet (MHW) offers three ways to create a new H wallet. These are via Keystore file, Passphrase, or Private Key. Pair the keys with an account ID to start transacting hbar.
                        </div>
                      </div>
                    </div>
                    <div class="accordion">
                      <div class="title">
                        <div class="title-text">
                          Can MHW work with other wallets?
                        </div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                          <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
                        </svg>
                      </div>
                      <div class="content">
                        <div class="content-text">
                          MHW supports many different wallet types with plans to include support for hardware wallets in the near future. We are also open for anyone to use their H wallets with the appropriate information.
                        </div>
                      </div>
                    </div>
                    <div class="accordion">
                      <div class="title">
                        <div class="title-text">
                          How much does it cost to use MHW?
                        </div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                          <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
                        </svg>
                      </div>
                      <div class="content">
                        <div class="content-text">
                          MHW does not charge any fees for interacting with the Hedera™ API. Hedera™ Hashgraph requires a transaction fee when interacting with the Hedera™ API. That fee paid in Hbar.
                        </div>
                      </div>
                    </div>
                    <div class="accordion">
                      <div class="title">
                        <div class="title-text">
                          I forgot my passphrase / private key! What can I do?
                        </div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                          <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
                        </svg>
                      </div>
                      <div class="content">
                        <div class="content-text">
                          MHW does not offer support for recovery or reset of passwords / private keys. We always suggest writing down private keys and passwords on physical media for safekeeping. Maybe you saved it on your computer!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
