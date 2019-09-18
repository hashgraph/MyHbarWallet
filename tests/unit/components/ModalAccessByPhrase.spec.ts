import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalAccessByPhrase from "../../../src/components/ModalAccessByPhrase.vue";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("ModalAccessByPhrase.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders not busy, not valid", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByPhrase, {
            localVue,
            i18n,
            propsData: {
                state: {
                    modalIsOpen: false,
                    words: [
                        "skull",
                        "emerge",
                        "cinnamon",
                        "else",
                        "retire",
                        "zero",
                        "fatigue",
                        "enact",
                        "tank",
                        "caution",
                        "skirt",
                        "debate",
                        "become",
                        "ocean",
                        "copper",
                        "engage",
                        "coast",
                        "legal",
                        "boat",
                        "page",
                        "laundry",
                        "claw",
                        "legal",
                        "coast"
                    ],
                    isBusy: false,
                    isValid: false
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-mnemonic-phrase">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Access by Mnemonic Phrase</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
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
                            This is not a recommended way to access your wallet. Due to the sensitivity of the information involved, these options should only be used in offline settings by experienced users.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="content-container">
                      <div class="instruction">
                        Please type in your mnemonic phrase
                      </div>
                      <form>
                        <div class="list-container phrase-input"><label class="list-item"><span class="number">1.</span> <input type="text" data-index="1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">2.</span> <input type="text" data-index="2" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">3.</span> <input type="text" data-index="3" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">4.</span> <input type="text" data-index="4" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">5.</span> <input type="text" data-index="5" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">6.</span> <input type="text" data-index="6" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">7.</span> <input type="text" data-index="7" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">8.</span> <input type="text" data-index="8" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">9.</span> <input type="text" data-index="9" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">10.</span> <input type="text" data-index="10" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">11.</span> <input type="text" data-index="11" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">12.</span> <input type="text" data-index="12" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">13.</span> <input type="text" data-index="13" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">14.</span> <input type="text" data-index="14" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">15.</span> <input type="text" data-index="15" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">16.</span> <input type="text" data-index="16" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">17.</span> <input type="text" data-index="17" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">18.</span> <input type="text" data-index="18" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">19.</span> <input type="text" data-index="19" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">20.</span> <input type="text" data-index="20" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">21.</span> <input type="text" data-index="21" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">22.</span> <input type="text" data-index="22" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">23.</span> <input type="text" data-index="23" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">24.</span> <input type="text" data-index="24" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label></div> <button type="submit" class="continue-btn"><span>Continue</span>
                          <!----></button>
                      </form>
                      <div class="support">
                        <div class="customer-support-link">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders not busy, valid", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByPhrase, {
            localVue,
            i18n,
            propsData: {
                state: {
                    modalIsOpen: false,
                    words: [
                        "skull",
                        "emerge",
                        "cinnamon",
                        "else",
                        "retire",
                        "zero",
                        "fatigue",
                        "enact",
                        "tank",
                        "caution",
                        "skirt",
                        "debate",
                        "become",
                        "ocean",
                        "copper",
                        "engage",
                        "coast",
                        "legal",
                        "boat",
                        "page",
                        "laundry",
                        "claw",
                        "legal",
                        "coast"
                    ],
                    isBusy: false,
                    isValid: true
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-mnemonic-phrase">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Access by Mnemonic Phrase</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
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
                            This is not a recommended way to access your wallet. Due to the sensitivity of the information involved, these options should only be used in offline settings by experienced users.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="content-container">
                      <div class="instruction">
                        Please type in your mnemonic phrase
                      </div>
                      <form>
                        <div class="list-container phrase-input"><label class="list-item"><span class="number">1.</span> <input type="text" data-index="1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">2.</span> <input type="text" data-index="2" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">3.</span> <input type="text" data-index="3" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">4.</span> <input type="text" data-index="4" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">5.</span> <input type="text" data-index="5" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">6.</span> <input type="text" data-index="6" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">7.</span> <input type="text" data-index="7" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">8.</span> <input type="text" data-index="8" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">9.</span> <input type="text" data-index="9" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">10.</span> <input type="text" data-index="10" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">11.</span> <input type="text" data-index="11" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">12.</span> <input type="text" data-index="12" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">13.</span> <input type="text" data-index="13" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">14.</span> <input type="text" data-index="14" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">15.</span> <input type="text" data-index="15" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">16.</span> <input type="text" data-index="16" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">17.</span> <input type="text" data-index="17" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">18.</span> <input type="text" data-index="18" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">19.</span> <input type="text" data-index="19" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">20.</span> <input type="text" data-index="20" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">21.</span> <input type="text" data-index="21" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">22.</span> <input type="text" data-index="22" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">23.</span> <input type="text" data-index="23" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">24.</span> <input type="text" data-index="24" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label></div> <button type="submit" class="continue-btn"><span>Continue</span>
                          <!----></button>
                      </form>
                      <div class="support">
                        <div class="customer-support-link">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders busy, not valid", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByPhrase, {
            localVue,
            i18n,
            propsData: {
                state: {
                    modalIsOpen: false,
                    words: [
                        "skull",
                        "emerge",
                        "cinnamon",
                        "else",
                        "retire",
                        "zero",
                        "fatigue",
                        "enact",
                        "tank",
                        "caution",
                        "skirt",
                        "debate",
                        "become",
                        "ocean",
                        "copper",
                        "engage",
                        "coast",
                        "legal",
                        "boat",
                        "page",
                        "laundry",
                        "claw",
                        "legal",
                        "coast"
                    ],
                    isBusy: true,
                    isValid: false
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-mnemonic-phrase">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Access by Mnemonic Phrase</span>
                    <!---->
                  </header>
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
                            This is not a recommended way to access your wallet. Due to the sensitivity of the information involved, these options should only be used in offline settings by experienced users.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="content-container">
                      <div class="instruction">
                        Please type in your mnemonic phrase
                      </div>
                      <form>
                        <div class="list-container phrase-input"><label class="list-item"><span class="number">1.</span> <input type="text" data-index="1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">2.</span> <input type="text" data-index="2" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">3.</span> <input type="text" data-index="3" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">4.</span> <input type="text" data-index="4" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">5.</span> <input type="text" data-index="5" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">6.</span> <input type="text" data-index="6" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">7.</span> <input type="text" data-index="7" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">8.</span> <input type="text" data-index="8" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">9.</span> <input type="text" data-index="9" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">10.</span> <input type="text" data-index="10" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">11.</span> <input type="text" data-index="11" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">12.</span> <input type="text" data-index="12" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">13.</span> <input type="text" data-index="13" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">14.</span> <input type="text" data-index="14" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">15.</span> <input type="text" data-index="15" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">16.</span> <input type="text" data-index="16" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">17.</span> <input type="text" data-index="17" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">18.</span> <input type="text" data-index="18" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">19.</span> <input type="text" data-index="19" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">20.</span> <input type="text" data-index="20" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">21.</span> <input type="text" data-index="21" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">22.</span> <input type="text" data-index="22" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">23.</span> <input type="text" data-index="23" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">24.</span> <input type="text" data-index="24" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label></div> <button type="submit" class="continue-btn busy"><svg width="24" height="24" viewBox="0 0 24 24" class="spinner mdi-spin">
                            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
                          </svg>
                          <!----></button>
                      </form>
                      <div class="support">
                        <div class="customer-support-link">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders busy, valid", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByPhrase, {
            localVue,
            i18n,
            propsData: {
                state: {
                    modalIsOpen: false,
                    words: [
                        "skull",
                        "emerge",
                        "cinnamon",
                        "else",
                        "retire",
                        "zero",
                        "fatigue",
                        "enact",
                        "tank",
                        "caution",
                        "skirt",
                        "debate",
                        "become",
                        "ocean",
                        "copper",
                        "engage",
                        "coast",
                        "legal",
                        "boat",
                        "page",
                        "laundry",
                        "claw",
                        "legal",
                        "coast"
                    ],
                    isBusy: true,
                    isValid: true
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-mnemonic-phrase">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Access by Mnemonic Phrase</span>
                    <!---->
                  </header>
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
                            This is not a recommended way to access your wallet. Due to the sensitivity of the information involved, these options should only be used in offline settings by experienced users.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="content-container">
                      <div class="instruction">
                        Please type in your mnemonic phrase
                      </div>
                      <form>
                        <div class="list-container phrase-input"><label class="list-item"><span class="number">1.</span> <input type="text" data-index="1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">2.</span> <input type="text" data-index="2" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">3.</span> <input type="text" data-index="3" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">4.</span> <input type="text" data-index="4" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">5.</span> <input type="text" data-index="5" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">6.</span> <input type="text" data-index="6" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">7.</span> <input type="text" data-index="7" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">8.</span> <input type="text" data-index="8" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">9.</span> <input type="text" data-index="9" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">10.</span> <input type="text" data-index="10" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">11.</span> <input type="text" data-index="11" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">12.</span> <input type="text" data-index="12" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">13.</span> <input type="text" data-index="13" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">14.</span> <input type="text" data-index="14" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">15.</span> <input type="text" data-index="15" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">16.</span> <input type="text" data-index="16" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">17.</span> <input type="text" data-index="17" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">18.</span> <input type="text" data-index="18" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">19.</span> <input type="text" data-index="19" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">20.</span> <input type="text" data-index="20" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">21.</span> <input type="text" data-index="21" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">22.</span> <input type="text" data-index="22" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">23.</span> <input type="text" data-index="23" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">24.</span> <input type="text" data-index="24" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label></div> <button type="submit" class="continue-btn busy"><svg width="24" height="24" viewBox="0 0 24 24" class="spinner mdi-spin">
                            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
                          </svg>
                          <!----></button>
                      </form>
                      <div class="support">
                        <div class="customer-support-link">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
