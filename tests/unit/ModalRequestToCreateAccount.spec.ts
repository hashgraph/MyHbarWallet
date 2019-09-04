import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalRequestToCreateAccount from "../../src/components/ModalRequestToCreateAccount.vue";
import { Ed25519PublicKey } from "@hashgraph/sdk";

describe("ModalRequestToCreateAccount.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const onChange = jest.fn();
        const hasAccount = jest.fn();

        const wrapper = mount(ModalRequestToCreateAccount, {
            localVue,
            propsData: {
                isOpen: false,
                publicKey: Ed25519PublicKey.fromString(
                    "302a300506032b6570032100dec80229a4a416d552f99c9e9b772ff1061b736ade30bf93abdae260b0975f29"
                ),
                event: ""
            },
            listeners: {
                change: onChange,
                hasAccount
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div role="dialog" aria-modal="true" class="modal-background">
              <div class="modal">
                <header><span class="title">Request to Create Account</span>
                  <!---->
                </header>
                <div class="main">
                  <div class="content-container">
                    <div class="instructions">
                      <div>
                        Provide your public key (this QR code or the copied text) to an
                        existing account owner on the Hedera network.
                      </div>
                      <div>
                        They must create and fund your account, then provide you with
                        your new account ID.
                      </div>
                    </div>
                    <form class="modal-request-to-create-account">
                      <div value="302a300506032b6570032100dec80229a4a416d552f99c9e9b772ff1061b736ade30bf93abdae260b0975f29" level="L" background="#fff" foreground="#000" class="pub-qr"><canvas height="180" width="180" style="width: 180px; height: 180px;"></canvas></div>
                      <div class="read-only-input">
                        <div class="">302a300506032b6570032100dec80229a4a416d552f99c9e9b772ff1061b736ade30bf93abdae260b0975f29</div>
                      </div>
                      <div class="buttons"><button type="submit" class="button outline compact"><span>Copy Public Key</span>
                          <!----></button> <button type="submit" class="button compact"><span>I have an Account ID</span>
                          <!----></button></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
