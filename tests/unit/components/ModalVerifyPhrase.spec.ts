import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ModalVerifyPhrase from "../../../src/ui/components/ModalVerifyPhrase.vue";
import i18n from "../../../src/service/i18n";

describe("ModalVerifyPhrase.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    const WORDS = [
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
    ];

    it("renders, words", async (): Promise<void> => {
        expect.assertions(1);

        const onChange = jest.fn();
        const hasAccount = jest.fn();
        const wrapper = mount(ModalVerifyPhrase, {
            localVue,
            i18n,
            propsData: {
                isOpen: true,
                words: WORDS
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
                    <header><span class="title">Verification</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <!---->
                    <div class="main">
                      <div class="content-container">
                        <div class="prompt">
                          Please enter and fill out the empty boxes below to verify your mnemonic phrase key.
                        </div>
                        <form>
                          <div class="mnemonic"><label class="readonly"><span class="number">1.</span> <input readonly="readonly" data-index="0" tabindex="-1" class="word"></label><label class="readonly"><span class="number">2.</span> <input readonly="readonly" data-index="1" tabindex="-1" class="word"></label><label class=""><span class="number">3.</span> <input data-index="2" class="word"></label><label class=""><span class="number">4.</span> <input data-index="3" class="word"></label><label class="readonly"><span class="number">5.</span> <input readonly="readonly" data-index="4" tabindex="-1" class="word"></label><label class="readonly"><span class="number">6.</span> <input readonly="readonly" data-index="5" tabindex="-1" class="word"></label><label class="readonly"><span class="number">7.</span> <input readonly="readonly" data-index="6" tabindex="-1" class="word"></label><label class="readonly"><span class="number">8.</span> <input readonly="readonly" data-index="7" tabindex="-1" class="word"></label><label class="readonly"><span class="number">9.</span> <input readonly="readonly" data-index="8" tabindex="-1" class="word"></label><label class="readonly"><span class="number">10.</span> <input readonly="readonly" data-index="9" tabindex="-1" class="word"></label><label class="readonly"><span class="number">11.</span> <input readonly="readonly" data-index="10" tabindex="-1" class="word"></label><label class=""><span class="number">12.</span> <input data-index="11" class="word"></label><label class=""><span class="number">13.</span> <input data-index="12" class="word"></label><label class="readonly"><span class="number">14.</span> <input readonly="readonly" data-index="13" tabindex="-1" class="word"></label><label class="readonly"><span class="number">15.</span> <input readonly="readonly" data-index="14" tabindex="-1" class="word"></label><label class="readonly"><span class="number">16.</span> <input readonly="readonly" data-index="15" tabindex="-1" class="word"></label><label class="readonly"><span class="number">17.</span> <input readonly="readonly" data-index="16" tabindex="-1" class="word"></label><label class="readonly"><span class="number">18.</span> <input readonly="readonly" data-index="17" tabindex="-1" class="word"></label><label class="readonly"><span class="number">19.</span> <input readonly="readonly" data-index="18" tabindex="-1" class="word"></label><label class="readonly"><span class="number">20.</span> <input readonly="readonly" data-index="19" tabindex="-1" class="word"></label><label class=""><span class="number">21.</span> <input data-index="20" class="word"></label><label class="readonly"><span class="number">22.</span> <input readonly="readonly" data-index="21" tabindex="-1" class="word"></label><label class="readonly"><span class="number">23.</span> <input readonly="readonly" data-index="22" tabindex="-1" class="word"></label><label class="readonly"><span class="number">24.</span> <input readonly="readonly" data-index="23" tabindex="-1" class="word"></label></div>
                          <div class="password-container">
                            <div class="header">
                              <div class="text">
                                Password
                              </div>
                              <div class="password-switch">
                                <div class="text">
                                  Optional
                                </div> <label class="switch-button btn"><input type="checkbox" class="input"> <span class="thumb"></span>
                                  <!---->
                                </label>
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
              </div>
              <div class="btn-container"><button type="submit" class="">
                  <!----> <span>Verify</span>
                  <!---->
                </button></div>
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
