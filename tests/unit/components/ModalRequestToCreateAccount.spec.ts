import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import { Ed25519PublicKey } from "@hashgraph/sdk";
import VueI18n from "vue-i18n";

import ModalRequestToCreateAccount from "../../../src/ui/components/ModalRequestToCreateAccount.vue";
import i18n from "../../../src/service/i18n";

describe("ModalRequestToCreateAccount.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    const PUBLIC_KEY = Ed25519PublicKey.fromString(
        "302a300506032b6570032100dec80229a4a416d552f99c9e9b772ff1061b736ade30bf93abdae260b0975f29"
    );

    it("renders open", async (): Promise<void> => {
        expect.assertions(1);

        const onChange = jest.fn();
        const hasAccount = jest.fn();

        const wrapper = mount(ModalRequestToCreateAccount, {
            localVue,
            i18n,
            propsData: {
                isOpen: true,
                publicKey: PUBLIC_KEY,
                event: ""
            },
            listeners: {
                change: onChange,
                hasAccount
            }
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const modal = wrapper.vm.$children.find(
            child => child.$options.name === "Modal"
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        modal!.showModal();
        await localVue.nextTick();

        expect(wrapper).toMatchInlineSnapshot(`
            <transition-stub name="fade">
              <div role="dialog" aria-modal="true" class="modal-background">
                <transition-stub name="slidefade">
                  <div class="modal">
                    <header><span class="title">Request to Create Account</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <!---->
                    <div class="main">
                      <div class="content-container">
                        <div class="instructions">
                          <div>
                            Provide your public key (this QR code or the copied text) to an existing account owner on the Hedera™ network.
                          </div>
                          <div>
                            They must create and fund your account, then provide you with your new account ID.
                          </div>
                        </div>
                        <form class="request-to-create-account">
                          <div value="dec80229a4a416d552f99c9e9b772ff1061b736ade30bf93abdae260b0975f29" level="L" background="#fff" foreground="#000" class="pub-qr"><canvas height="180" width="180" style="width: 180px; height: 180px;"></canvas></div>
                          <div class="read-only-input">
                            <div class="value multiline">
                              dec80229a4a416d552f99c9e9b772ff1061b736ade30bf93abdae260b0975f29
                            </div>
                            <!---->
                          </div>
                          <div class="buttons"><button type="submit" class="button outline compact">
                              <!----> <span>Copy Public Key</span>
                              <!----></button> <button type="submit" class="button compact">
                              <!----> <span>I have an Account ID</span>
                              <!----></button></div>
                        </form>
                      </div>
                    </div>
                  </div>
                </transition-stub>
              </div>
            </transition-stub>
        `);
    });
});
