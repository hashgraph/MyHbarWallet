import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalAccessByPrivateKey from "../../src/components/ModalAccessByPrivateKey.vue";

describe("ModalAccessByPrivateKey.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByPrivateKey, {
            localVue,
            propsData: {
                state: {
                    modalIsOpen: false,
                    rawPrivateKey: "raw_private_key",
                    isBusy: false
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div role="dialog" aria-modal="true" class="modal-background">
              <div class="modal">
                <header><span class="title">Access by Private Key</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                  </svg></header>
                <div class="main">
                  <div class="warning">
                    <div class="notice">
                      <div class="symbol-container"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                          <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path>
                        </svg></div>
                      <div class="text">
                        <div class="title">
                          NOT RECOMMENDED
                        </div>
                        <div class="message">
                          This is not a recommended way to access your wallet. Due to the
                          sensitivity of the information involved, these options should only
                          be used in offline settings by experienced users.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="content-container">
                    <form class="modal-access-by-private-key">
                      <div class="text-input"><label class="label-container">
                          <!----> <span class="input-container"><!----> <span class="input-wrapper"><input placeholder="Enter Private Key" type="text" autocomplete="on"> <!----></span>
                          <!----></span></label>
                        <!---->
                        <!---->
                      </div> <button type="submit" disabled="disabled" class="button-access-wallet"><span>Access Account</span>
                        <!----></button>
                      <div class="customer-support-link"><img alt="" src=""> Customer Support
                        <div role="dialog" aria-modal="true" class="modal-background">
                          <div class="modal">
                            <header><span class="title">Issue Information</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                              </svg></header>
                            <div class="main">
                              <div class="content-container">
                                <form class="modal-issue-information">
                                  <div class="text-input issue-item"><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><input placeholder="Browser" type="text" autocomplete="on"> <!----></span>
                                      <!----></span></label>
                                    <!---->
                                    <!---->
                                  </div>
                                  <div class="text-input issue-item"><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><input placeholder="Operating System" type="text" autocomplete="on"> <!----></span>
                                      <!----></span></label>
                                    <!---->
                                    <!---->
                                  </div>
                                  <div class="text-input issue-item"><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><input placeholder="Device/Wallet type (if any)" type="text" autocomplete="on"> <!----></span>
                                      <!----></span></label>
                                    <!---->
                                    <!---->
                                  </div>
                                  <div class="text-input issue-item"><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><input placeholder="Account ID (if any)" type="text" autocomplete="on"> <!----></span>
                                      <!----></span></label>
                                    <!---->
                                    <!---->
                                  </div>
                                  <div class="text-input issue-item"><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><input placeholder="URL" type="text" autocomplete="on"> <!----></span>
                                      <!----></span></label>
                                    <!---->
                                    <!---->
                                  </div>
                                  <div class="text-input issue-item is-multiline"><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><textarea placeholder="Describe the issue" rows="8" class="text-area resize"></textarea> <!----></span>
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
                    </form>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
