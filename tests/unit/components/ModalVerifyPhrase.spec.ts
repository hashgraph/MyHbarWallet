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
              <!---->
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
              <!---->
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
              <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" name="ease">
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
                        <div class="mnemonic"></div>
                        <div class="btn-container"><button type="submit" class="">
                            <!----> <span>Verify</span>
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
