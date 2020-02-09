import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalPhrasePrintPreview from "../../../src/components/ModalPhrasePrintPreview.vue";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("ModalPhrasePrintPreview.vue", (): void => {
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

    it("renders closed, no words", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalPhrasePrintPreview, {
            localVue,
            i18n,
            propsData: {
                isOpen: false,
                words: []
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(``);
    });

    it("renders closed, words", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalPhrasePrintPreview, {
            localVue,
            i18n,
            propsData: {
                isOpen: false,
                words: WORDS
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(``);
    });

    it("renders open, no words", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalPhrasePrintPreview, {
            localVue,
            i18n,
            propsData: {
                isOpen: true,
                words: []
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background">
              <div class="modal large">
                <header><span class="title">Print Preview</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                  </svg></header>
                <!---->
                <div class="main">
                  <div class="content-container">
                    <div>
                      <div class="logo-contents">
                        <div class="header-container"><span class="header">
                                My<strong>Hbar</strong>Wallet
                            </span> <span class="sub-header">Mnemonic Phrase</span></div>
                        <div class="support-email"><img alt="" src="../assets/icon-bell.svg" class="icon">support@myhbarwallet.app
                        </div>
                      </div>
                      <div class="password-disclaimer">
                        <h3>
                          Save this sheet! Print it and keep it in a safe place! This is your property!
                        </h3>
                        <p>We <span class="important">CAN NOT</span> change your password. Please <span class="important">DO NOT FORGET</span> to save your password. It is your private key. You will need this <span class="important">Password + Mnemonic Phrase</span> to access your wallet.</p>
                      </div>
                      <div class="contents">
                        <div class="list-container"></div>
                      </div>
                    </div>
                    <div class="button-container"><button type="submit" class="button-save outline">
                        <!----> <span>Save</span>
                        <!----></button></div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders open, words", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalPhrasePrintPreview, {
            localVue,
            i18n,
            propsData: {
                isOpen: false,
                words: WORDS
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(``);
    });
});
