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
                      <div class="title-text">
                        FAQs
                      </div>
                      <div class="subtitle-text">
                        Answers to most frequently asked questions.
                      </div>
                    </div>
                    <div class="customer-support-link customer-support-link">
                      <div class="customer-support-container"><img alt="" src="">Customer Support
                      </div>
                      <!---->
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
                          MyHbarWallet (MHW) offers three ways to create a new H wallet. These are: By Keystore, By Mnemonic Phrase, or With a Hardware Wallet. Pair your keys with an account ID to start transacting hbar.
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
                          MHW supports many different wallet types, including hardware, with additional hardware wallet support currently in development. We are also open for anyone to use their H wallets with the appropriate information.
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
