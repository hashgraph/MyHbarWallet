import { createLocalVue, mount } from "@vue/test-utils";
import ExportKeystoreButton from "../../../src/components/ExportKeystoreButton.vue";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import i18n from "../../../src/i18n";

describe("ExportKeystoreButton.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(ExportKeystoreButton, {
            localVue,
            i18n
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <span class="download-button"><div class="tooltip-container"><div class="slot-container"><svg width="24" height="24" viewBox="0 0 24 24" class="export-keystore-icon"><path d="M14,2H6C4.89,2 4,2.89 4,4V20C4,21.11 4.89,22 6,22H18C19.11,22 20,21.11 20,20V8L14,2M12,19L8,15H10.5V12H13.5V15H16L12,19M13,9V3.5L18.5,9H13Z"></path></svg></div> <div class="message">
                    Download Keystore File
                </div></div> <div class="modal-export-generate-keystore"><div role="dialog" aria-modal="true" class="modal-background"><div class="modal"><header><span class="title">Export Keystore File</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
            </svg></header>
            <div class="main">
              <div class="content-container">
                <div class="password-info-header-wrapper">
                  <div class="password-info-header">
                    Set Keystore Password
                    <span class="info-button"><div class="tooltip-container"><div class="slot-container"><svg width="24" height="24" viewBox="0 0 24 24" class="icon"><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path></svg></div> <div class="message">
                    This password will encrypt your private key
                </div></div></span></div>
                </div>
                <form>
                  <div class="text-input input"><label class="label-container">
                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Please Enter At Least 9 Characters" type="password" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="eye"><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path></svg></span></div>
              </div>
            </span>
            <!----></span></label>
            <!---->
            <!---->
            </div>
            <div class="text-input"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Confirm Password" type="password" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="eye"><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path></svg></span></div>
            </div></span>
            <!----></span></label>
            <!---->
            <!---->
            </div>
            <!---->
            <!---->
            <!---->
            <div class="btn-container"><button type="submit" disabled="disabled" class="btn"><span>Next</span> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                  <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                </svg></button></div>
            </form>
            <p class="footer"><span class="important">DO NOT FORGET</span> to save your password. You will need this <span class="important">Password + Keystore</span> File to unlock your wallet.</p>
            </div>
            </div>
            </div>
            </div>
            </div>
            <div class="modal-export-download-keystore">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Export Keystore File</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                    </svg></header>
                  <div class="main">
                    <div class="content-container">
                      <div class="save-my-keystore-cards"><span class="body-title">Save This Keystore File!</span>
                        <div class="card"><img src="" alt="" class="card-image">
                          <div class="card-body-wrapper"><span class="card-header">Don't Lose It</span>
                            <p class="card-body">
                              Be careful, it can not be recovered if you lose it.
                            </p>
                          </div>
                        </div>
                        <div class="card"><img src="" alt="" class="card-image">
                          <div class="card-body-wrapper"><span class="card-header">Don't Share It</span>
                            <p class="card-body">
                              Your funds will be stolen if you use this file on a malicious phishing site.
                            </p>
                          </div>
                        </div>
                        <div class="card"><img src="" alt="" class="card-image">
                          <div class="card-body-wrapper"><span class="card-header">Make a Backup</span>
                            <p class="card-body">
                              Secure it like the millions of dollars it may one day be worth.
                            </p>
                          </div>
                        </div>
                      </div> <button type="submit" class="download compact"><span>Download Keystore File</span>
                        <!----></button>
                    </div>
                  </div>
                </div>
              </div>
            </div></span>
        `);
    });
});
