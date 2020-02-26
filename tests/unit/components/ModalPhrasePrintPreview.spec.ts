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
            listeners: { change: onChange }
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
            listeners: { change: onChange }
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
            listeners: { change: onChange }
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
                        <div>
                          <p>Your Mnemonic Passphrase</p>
                          <div class="read-only-input roinput">
                            <div class="multiline obscure">

                            </div> <svg width="40" height="40" viewBox="0 0 24 24" class="eye">
                              <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path>
                            </svg>
                          </div>
                        </div>
                        <div class="contents">
                          <div class="mnemonic-input">
                            <div class="list-container"></div>
                            <!---->
                          </div>
                        </div>
                      </div>
                      <div class="button-container"><button type="submit" class="button-save outline">
                          <!----> <span>Save</span>
                          <!----></button></div>
                    </div>
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
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot(``);
    });
});
