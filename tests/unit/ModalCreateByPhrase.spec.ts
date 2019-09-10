import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalCreateByPhrase from "../../src/components/ModalCreateByPhrase.vue";

describe("ModalCreateByPhrase.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const onChange = jest.fn();
        const wrapper = mount(ModalCreateByPhrase, {
            localVue,
            propsData: {
                isOpen: false
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-create-by-mnemonic-phrase">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Create by Mnemonic Phrase</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
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
                      <div class="password-info-header-wrapper">
                        <div class="password-info-header">
                          Your Password
                          <span class="info-button"><div class="tooltip-container"><div class="slot-container"><svg width="24" height="24" viewBox="0 0 24 24" class="icon"><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path></svg></div> <div class="message">
                    This password encrypts your private key. This does not act as a seed to generate your keys.
                </div></div></span></div>
                      </div>
                      <div class="value-switch">
                        <div class="spacer"></div>
                        <div class="random-button"><svg width="16" height="16" viewBox="0 0 24 24" class="">
                            <path d="M19,8L15,12H18A6,6 0 0,1 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20A8,8 0 0,0 20,12H23M6,12A6,6 0 0,1 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4A8,8 0 0,0 4,12H1L5,16L9,12"></path>
                          </svg>
                          Random
                        </div>
                      </div>
                      <div class="list-container phrase-input"><label class="list-item"><span class="number">1.</span> <input type="text" readonly="readonly" data-index="1" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">2.</span> <input type="text" readonly="readonly" data-index="2" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">3.</span> <input type="text" readonly="readonly" data-index="3" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">4.</span> <input type="text" readonly="readonly" data-index="4" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">5.</span> <input type="text" readonly="readonly" data-index="5" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">6.</span> <input type="text" readonly="readonly" data-index="6" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">7.</span> <input type="text" readonly="readonly" data-index="7" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">8.</span> <input type="text" readonly="readonly" data-index="8" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">9.</span> <input type="text" readonly="readonly" data-index="9" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">10.</span> <input type="text" readonly="readonly" data-index="10" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">11.</span> <input type="text" readonly="readonly" data-index="11" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">12.</span> <input type="text" readonly="readonly" data-index="12" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">13.</span> <input type="text" readonly="readonly" data-index="13" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">14.</span> <input type="text" readonly="readonly" data-index="14" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">15.</span> <input type="text" readonly="readonly" data-index="15" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">16.</span> <input type="text" readonly="readonly" data-index="16" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">17.</span> <input type="text" readonly="readonly" data-index="17" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">18.</span> <input type="text" readonly="readonly" data-index="18" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">19.</span> <input type="text" readonly="readonly" data-index="19" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">20.</span> <input type="text" readonly="readonly" data-index="20" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">21.</span> <input type="text" readonly="readonly" data-index="21" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">22.</span> <input type="text" readonly="readonly" data-index="22" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">23.</span> <input type="text" readonly="readonly" data-index="23" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">24.</span> <input type="text" readonly="readonly" data-index="24" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label></div>
                      <!---->
                      <div class="continue-btn-container"><button type="submit" class="continue-btn"><span>I Wrote Down My Mnemonic Phrase</span>
                          <!----></button>
                        <div class="verify-phrase">
                          <div role="dialog" aria-modal="true" class="modal-background">
                            <div class="modal">
                              <header><span class="title">Verification</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                                </svg></header>
                              <div class="main">
                                <div class="content-container">
                                  <div class="prompt">
                                    Please enter and fill out the empty boxes below to verify your
                                    mnemonic phrase key.
                                  </div>
                                  <form>
                                    <div class="mnemonic"></div>
                                    <div class="btn-container"><button type="submit" class=""><span>Verify</span>
                                        <!----></button></div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> <img src="" class="printer-button">
                        <div role="dialog" aria-modal="true" class="modal-background">
                          <div class="modal large">
                            <header><span class="title">Print Preview</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                              </svg></header>
                            <div class="main">
                              <div class="content-container">
                                <div>
                                  <div class="logo-contents">
                                    <div class="header-container"><span class="header">
                                My<strong>Hbar</strong>Wallet
                            </span> <span class="sub-header">Mnemonic Phrase</span></div>
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
                                                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Browser" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                                                    <!----></span></label>
                                                  <!---->
                                                  <!---->
                                                </div>
                                                <div class="text-input issue-item"><label class="label-container">
                                                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Operating System" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                                                    <!----></span></label>
                                                  <!---->
                                                  <!---->
                                                </div>
                                                <div class="text-input issue-item"><label class="label-container">
                                                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Device/Wallet type (if any)" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                                                    <!----></span></label>
                                                  <!---->
                                                  <!---->
                                                </div>
                                                <div class="text-input issue-item"><label class="label-container">
                                                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Account ID (if any)" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                                                    <!----></span></label>
                                                  <!---->
                                                  <!---->
                                                </div>
                                                <div class="text-input issue-item"><label class="label-container">
                                                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="URL" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
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
                                  <div class="password-disclaimer">
                                    <h3>
                                      Save this sheet! Print it and keep it in a safe place! This
                                      is your property!
                                    </h3>
                                    We <strong>CAN NOT</strong> change your mnemonic phrase. Please
                                    <strong>DO NOT FORGET</strong> to save this information. You
                                    will need this <strong>Mnemonic Phrase</strong> to access your
                                    wallet. This is your private key!
                                  </div>
                                  <div class="contents">
                                    <div class="list-container"></div>
                                  </div>
                                </div>
                                <div class="button-container"><button type="submit" class="button-save outline"><span>Save</span>
                                    <!----></button></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="warning-container">
                        <p class="do-not-forget"><span class="important"> DO NOT FORGET</span> to save your
                          password. You will need this to access your wallet.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
