import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalExportGenerateKeystore from "../../../src/components/ModalExportGenerateKeystore.vue";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("ModalExportGenerateKeystore.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    const PASSWORD = "as;dkgjap;hfgwp;[weioh[pe9igh[qerighj;s'dkfhherpg";

    it("renders, closed, not busy", (): void => {
        expect.assertions(2);

        const onChange = jest.fn();
        const wrapper = mount(ModalExportGenerateKeystore, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: false,
                    isBusy: false,
                    passwordGeneratorState: {
                        password: PASSWORD,
                        passwordStrength: 0,
                        passwordSuggestion: ""
                    }
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(onChange).toHaveBeenCalledTimes(0);
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-export-generate-keystore">
              <!---->
            </div>
        `);
    });

    it("renders, open, not busy", (): void => {
        expect.assertions(2);

        const onChange = jest.fn();
        const wrapper = mount(ModalExportGenerateKeystore, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: true,
                    isBusy: false,
                    passwordGeneratorState: {
                        password: PASSWORD,
                        passwordStrength: 0,
                        passwordSuggestion: ""
                    }
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(onChange).toHaveBeenCalledTimes(0);
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-export-generate-keystore">
              <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" name="ease">
                <div class="modal">
                  <header><span class="title">Export Keystore File</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
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
                    </div></span>
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
              <div class="password-hint-container">
                Password strength:
                <span class="strength very-weak">
                        Very Weak
                    </span></div>
              <!---->
              <div></div>
              <div class="btn-container"><button type="submit" disabled="disabled" class="btn">
                  <!----> <span>Next</span> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                  </svg></button></div>
              </form>
              <p class="footer"><span class="important">DO NOT FORGET</span> to save your password. You will need this <span class="important">Password + Keystore</span> File to unlock your wallet.</p>
            </div>
            </div>
            </div>
            </div>
            </div>
        `);
    });

    it("renders, closed, busy", (): void => {
        expect.assertions(2);

        const onChange = jest.fn();
        const wrapper = mount(ModalExportGenerateKeystore, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: false,
                    isBusy: true,
                    passwordGeneratorState: {
                        password: PASSWORD,
                        passwordStrength: 0,
                        passwordSuggestion: ""
                    }
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(onChange).toHaveBeenCalledTimes(0);
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-export-generate-keystore">
              <!---->
            </div>
        `);
    });

    it("renders, open, busy", (): void => {
        expect.assertions(2);

        const onChange = jest.fn();
        const wrapper = mount(ModalExportGenerateKeystore, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: true,
                    isBusy: true,
                    passwordGeneratorState: {
                        password: PASSWORD,
                        passwordStrength: 0,
                        passwordSuggestion: ""
                    }
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(onChange).toHaveBeenCalledTimes(0);
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-export-generate-keystore">
              <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" name="ease">
                <div class="modal">
                  <header><span class="title">Export Keystore File</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
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
                    </div></span>
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
              <div class="password-hint-container">
                Password strength:
                <span class="strength very-weak">
                        Very Weak
                    </span></div>
              <!---->
              <div></div>
              <div class="btn-container"><button type="submit" disabled="disabled" class="btn">
                  <!----> <span>Next</span> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                  </svg></button></div>
              </form>
              <p class="footer"><span class="important">DO NOT FORGET</span> to save your password. You will need this <span class="important">Password + Keystore</span> File to unlock your wallet.</p>
            </div>
            </div>
            </div>
            </div>
            </div>
        `);
    });
});
