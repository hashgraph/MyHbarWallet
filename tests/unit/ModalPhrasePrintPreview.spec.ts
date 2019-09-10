import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalPhrasePrintPreview from "../../src/components/ModalPhrasePrintPreview.vue";

describe("ModalPhrasePrintPreview.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const onChange = jest.fn();
        const wrapper = mount(ModalPhrasePrintPreview, {
            localVue,
            propsData: {
                isOpen: false,
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
                ]
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
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
                        <div class="support-email"><img alt="" src="../assets/icon-bell.svg" class="icon">support@myhbarwallet.app
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
                        <div class="list-container"><label class="list-item"><span class="number">1.</span> <input type="text" readonly="readonly" data-index="1" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">2.</span> <input type="text" readonly="readonly" data-index="2" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">3.</span> <input type="text" readonly="readonly" data-index="3" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">4.</span> <input type="text" readonly="readonly" data-index="4" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">5.</span> <input type="text" readonly="readonly" data-index="5" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">6.</span> <input type="text" readonly="readonly" data-index="6" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">7.</span> <input type="text" readonly="readonly" data-index="7" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">8.</span> <input type="text" readonly="readonly" data-index="8" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">9.</span> <input type="text" readonly="readonly" data-index="9" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">10.</span> <input type="text" readonly="readonly" data-index="10" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">11.</span> <input type="text" readonly="readonly" data-index="11" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">12.</span> <input type="text" readonly="readonly" data-index="12" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">13.</span> <input type="text" readonly="readonly" data-index="13" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">14.</span> <input type="text" readonly="readonly" data-index="14" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">15.</span> <input type="text" readonly="readonly" data-index="15" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">16.</span> <input type="text" readonly="readonly" data-index="16" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">17.</span> <input type="text" readonly="readonly" data-index="17" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">18.</span> <input type="text" readonly="readonly" data-index="18" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">19.</span> <input type="text" readonly="readonly" data-index="19" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">20.</span> <input type="text" readonly="readonly" data-index="20" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">21.</span> <input type="text" readonly="readonly" data-index="21" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">22.</span> <input type="text" readonly="readonly" data-index="22" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">23.</span> <input type="text" readonly="readonly" data-index="23" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">24.</span> <input type="text" readonly="readonly" data-index="24" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label></div>
                      </div>
                    </div>
                    <div class="button-container"><button type="submit" class="button-save outline"><span>Save</span>
                        <!----></button></div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
