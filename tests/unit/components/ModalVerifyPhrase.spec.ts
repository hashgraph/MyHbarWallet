import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalVerifyPhrase from "../../../src/components/ModalVerifyPhrase.vue";
import VueI18n from "vue-i18n";
import i18n from "../../../src/i18n";

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

    it("renders closed, empty list", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const hasAccount = jest.fn();
        const wrapper = mount(ModalVerifyPhrase, {
            localVue,
            i18n,
            propsData: {
                isOpen: false,
                words: []
            },
            listeners: {
                change: onChange,
                hasAccount
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="verify-phrase">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Verification</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                    </svg></header>
                  <div class="main">
                    <div class="content-container">
                      <div class="prompt">
                        Please enter and fill out the empty boxes below to verify your mnemonic phrase key.
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
            </div>
        `);
    });

    it("renders closed, with list", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const hasAccount = jest.fn();
        const wrapper = mount(ModalVerifyPhrase, {
            localVue,
            i18n,
            propsData: {
                isOpen: false,
                words: WORDS
            },
            listeners: {
                change: onChange,
                hasAccount
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="verify-phrase">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Verification</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                    </svg></header>
                  <div class="main">
                    <div class="content-container">
                      <div class="prompt">
                        Please enter and fill out the empty boxes below to verify your mnemonic phrase key.
                      </div>
                      <form>
                        <div class="mnemonic"><label class="readonly"><span class="number">1.</span> <input readonly="readonly" data-index="0" tabindex="-1" class="word"></label><label class="readonly"><span class="number">2.</span> <input readonly="readonly" data-index="1" tabindex="-1" class="word"></label><label class="readonly"><span class="number">3.</span> <input readonly="readonly" data-index="2" tabindex="-1" class="word"></label><label class="readonly"><span class="number">4.</span> <input readonly="readonly" data-index="3" tabindex="-1" class="word"></label><label class="readonly"><span class="number">5.</span> <input readonly="readonly" data-index="4" tabindex="-1" class="word"></label><label class="readonly"><span class="number">6.</span> <input readonly="readonly" data-index="5" tabindex="-1" class="word"></label><label class="readonly"><span class="number">7.</span> <input readonly="readonly" data-index="6" tabindex="-1" class="word"></label><label class="readonly"><span class="number">8.</span> <input readonly="readonly" data-index="7" tabindex="-1" class="word"></label><label class="readonly"><span class="number">9.</span> <input readonly="readonly" data-index="8" tabindex="-1" class="word"></label><label class="readonly"><span class="number">10.</span> <input readonly="readonly" data-index="9" tabindex="-1" class="word"></label><label class="readonly"><span class="number">11.</span> <input readonly="readonly" data-index="10" tabindex="-1" class="word"></label><label class="readonly"><span class="number">12.</span> <input readonly="readonly" data-index="11" tabindex="-1" class="word"></label><label class="readonly"><span class="number">13.</span> <input readonly="readonly" data-index="12" tabindex="-1" class="word"></label><label class="readonly"><span class="number">14.</span> <input readonly="readonly" data-index="13" tabindex="-1" class="word"></label><label class="readonly"><span class="number">15.</span> <input readonly="readonly" data-index="14" tabindex="-1" class="word"></label><label class="readonly"><span class="number">16.</span> <input readonly="readonly" data-index="15" tabindex="-1" class="word"></label><label class="readonly"><span class="number">17.</span> <input readonly="readonly" data-index="16" tabindex="-1" class="word"></label><label class="readonly"><span class="number">18.</span> <input readonly="readonly" data-index="17" tabindex="-1" class="word"></label><label class="readonly"><span class="number">19.</span> <input readonly="readonly" data-index="18" tabindex="-1" class="word"></label><label class="readonly"><span class="number">20.</span> <input readonly="readonly" data-index="19" tabindex="-1" class="word"></label><label class="readonly"><span class="number">21.</span> <input readonly="readonly" data-index="20" tabindex="-1" class="word"></label><label class="readonly"><span class="number">22.</span> <input readonly="readonly" data-index="21" tabindex="-1" class="word"></label><label class="readonly"><span class="number">23.</span> <input readonly="readonly" data-index="22" tabindex="-1" class="word"></label><label class="readonly"><span class="number">24.</span> <input readonly="readonly" data-index="23" tabindex="-1" class="word"></label></div>
                        <div class="btn-container"><button type="submit" class=""><span>Verify</span>
                            <!----></button></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("does not get stuck in infinite loop if empty list is passed", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const hasAccount = jest.fn();
        const wrapper = mount(ModalVerifyPhrase, {
            localVue,
            i18n,
            propsData: {
                isOpen: true,
                words: []
            },
            listeners: {
                change: onChange,
                hasAccount
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="verify-phrase">
              <div role="dialog" aria-modal="true" class="modal-background is-open">
                <div class="modal">
                  <header><span class="title">Verification</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                    </svg></header>
                  <div class="main">
                    <div class="content-container">
                      <div class="prompt">
                        Please enter and fill out the empty boxes below to verify your mnemonic phrase key.
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
            </div>
        `);
    });
});
