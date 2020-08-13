import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ModalAccessByPhrase from "../../../src/ui/components/ModalAccessByPhrase.vue";
import i18n from "../../../src/service/i18n";

describe("ModalAccessByPhrase.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    const state = {
        isOpen: true,
        wordToggle: false,
        wordCount: 24,
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
        isValid: true,
        password: ""
    };

    it("renders not busy, not valid", async (): Promise<void> => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByPhrase, {
            localVue,
            i18n,
            propsData: { state },
            listeners: { change: onChange }
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
                    <header><span class="title">Access by Mnemonic Phrase</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <!---->
                    <div class="main">
                      <div class="content-container">
                        <div class="instruction">
                          Please select your mnemonic phrase length, then type your mnemonic below. Toggle the optional password input and type your password if your mnemonic requires a password.
                        </div>
                        <div class="word-count"><span class="bold">Mnemonic Phrase</span>
                          <div class="select select">
                            <div class="select-value-container">
                              <div class="select-value">
                                24 Words
                              </div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                              </svg>
                            </div>
                            <div class="select-menu">
                              <div class="select-option">
                                12 Words
                              </div>
                              <div class="select-option">
                                22 Words
                              </div>
                              <div class="select-option">
                                24 Words
                              </div>
                            </div>
                          </div>
                        </div>
                        <form>
                          <div class="mnemonic-input phrase-input">
                            <transition-group-stub tag="div" name="fade" class="list-container"><label class="list-item"><span class="number">1.</span> <input type="text" data-index="1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">2.</span> <input type="text" data-index="2" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">3.</span> <input type="text" data-index="3" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">4.</span> <input type="text" data-index="4" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">5.</span> <input type="text" data-index="5" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">6.</span> <input type="text" data-index="6" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">7.</span> <input type="text" data-index="7" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">8.</span> <input type="text" data-index="8" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">9.</span> <input type="text" data-index="9" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">10.</span> <input type="text" data-index="10" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">11.</span> <input type="text" data-index="11" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">12.</span> <input type="text" data-index="12" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">13.</span> <input type="text" data-index="13" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">14.</span> <input type="text" data-index="14" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">15.</span> <input type="text" data-index="15" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">16.</span> <input type="text" data-index="16" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">17.</span> <input type="text" data-index="17" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">18.</span> <input type="text" data-index="18" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">19.</span> <input type="text" data-index="19" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">20.</span> <input type="text" data-index="20" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">21.</span> <input type="text" data-index="21" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">22.</span> <input type="text" data-index="22" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">23.</span> <input type="text" data-index="23" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">24.</span> <input type="text" data-index="24" autocomplete="off" autocapitalize="off" class="word"></label></transition-group-stub>
                            <transition-stub name="fade">
                              <!---->
                            </transition-stub>
                          </div>
                          <div class="password-container">
                            <div class="header">
                              <div class="text">
                                Password
                              </div>
                              <div class="password-switch">
                                <div class="text">
                                  Optional
                                </div> <label class="switch-button btn"><input type="checkbox" class="input"> <span class="thumb"></span>
                                  <!----></label>
                              </div>
                            </div>
                            <div class="password-input">
                              <transition-stub name="fade">
                                <div class="text-input is-compact"><label class="label-container">
                                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Please Enter Password" type="password" tabindex="-1" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="eye"><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path></svg></span></div>
                            </div></span>
                            <!----></span></label>
                            <!---->
                            <!---->
                          </div>
                </transition-stub>
                <transition-stub name="fade">
                  <div class="password-warning">
                    <p></p>
                  </div>
                </transition-stub>
              </div>
              </div> <button type="submit" class="continue-btn busy"><svg width="24" height="24" viewBox="0 0 24 24" class="spinner mdi-spin">
                  <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
                </svg>
                <!---->
                <!----></button></form>
              <div class="support">
                <div class="customer-support-link">
                  <div class="customer-support-container"><img alt="" src="">Customer Support
                  </div>
                  <modal title="Issue Information">
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
                      </div> <button type="submit" class="send-button compact">
                        <!----> <span>Send</span>
                        <!----></button>
                    </form>
                  </modal>
                </div>
              </div>
              </div>
              </div>
              </div>
            </transition-stub>
            </div>
            </transition-stub>
        `);
    });
});
