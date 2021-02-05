import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ModalCreateByPhrase from "../../../src/ui/components/ModalCreateByPhrase.vue";
import i18n from "../../../src/service/i18n";

describe("ModalCreateByPhrase.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders open", async(): Promise<void> => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalCreateByPhrase, {
            localVue,
            i18n,
            propsData: { isOpen: true },
            listeners: { change: onChange },
            stubs: { CustomerSupportLink: true }
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const modal = wrapper.vm.$children.find(
            (child) => child.$options.name === "Modal"
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
                    <header><span class="title">Create by Mnemonic Phrase</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <!---->
                    <div class="main">
                      <div class="content-container">
                        <div class="password-info-header-wrapper">
                          <div class="password-info-header">
                            Your Password
                            <span class="info-button"><div class="tooltip-container"><div class="slot-container"><svg width="24" height="24" viewBox="0 0 24 24" class="icon"><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path></svg></div> <div class="message">
                    This password encrypts your private key. This does not act as a seed to generate your keys.
                </div></div></span>
                          </div>
                        </div>
                        <div class="value-switch">
                          <div class="spacer"></div>
                          <div class="random-button"><svg width="16" height="16" viewBox="0 0 24 24" class="">
                              <path d="M19,8L15,12H18A6,6 0 0,1 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20A8,8 0 0,0 20,12H23M6,12A6,6 0 0,1 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4A8,8 0 0,0 4,12H1L5,16L9,12"></path>
                            </svg>
                            Random
                          </div>
                        </div>
                        <div class="mnemonic-input phrase-input">
                          <transition-group-stub tag="div" name="fade" class="list-container"><label class="list-item"><span class="number">1.</span> <input type="text" readonly="readonly" data-index="1" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">2.</span> <input type="text" readonly="readonly" data-index="2" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">3.</span> <input type="text" readonly="readonly" data-index="3" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">4.</span> <input type="text" readonly="readonly" data-index="4" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">5.</span> <input type="text" readonly="readonly" data-index="5" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">6.</span> <input type="text" readonly="readonly" data-index="6" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">7.</span> <input type="text" readonly="readonly" data-index="7" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">8.</span> <input type="text" readonly="readonly" data-index="8" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">9.</span> <input type="text" readonly="readonly" data-index="9" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">10.</span> <input type="text" readonly="readonly" data-index="10" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">11.</span> <input type="text" readonly="readonly" data-index="11" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">12.</span> <input type="text" readonly="readonly" data-index="12" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">13.</span> <input type="text" readonly="readonly" data-index="13" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">14.</span> <input type="text" readonly="readonly" data-index="14" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">15.</span> <input type="text" readonly="readonly" data-index="15" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">16.</span> <input type="text" readonly="readonly" data-index="16" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">17.</span> <input type="text" readonly="readonly" data-index="17" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">18.</span> <input type="text" readonly="readonly" data-index="18" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">19.</span> <input type="text" readonly="readonly" data-index="19" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">20.</span> <input type="text" readonly="readonly" data-index="20" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">21.</span> <input type="text" readonly="readonly" data-index="21" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">22.</span> <input type="text" readonly="readonly" data-index="22" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">23.</span> <input type="text" readonly="readonly" data-index="23" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">24.</span> <input type="text" readonly="readonly" data-index="24" tabindex="-1" autocomplete="off" autocapitalize="off" class="word"></label></transition-group-stub>
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
                                <!---->
                              </label>
                            </div>
                          </div>
                          <div class="password-input">
                            <transition-stub name="fade">
                              <!---->
                            </transition-stub>
                            <transition-stub name="fade">
                              <div class="password-warning">
                                <p>If you choose to include a password, understand you will ALWAYS need this password with your mnemonic phrase. You can not change it. It becomes a permanent part of your phrase.</p>
                              </div>
                            </transition-stub>
                          </div>
                        </div>
                        <div class="continue-btn-container"><button type="submit" class="continue-btn">
                            <!----> <span>I Wrote Down My Mnemonic Phrase</span>
                            <!---->
                          </button>
                          <transition-stub name="fade">
                            <!---->
                          </transition-stub> <img src="" class="printer-button">
                          <transition-stub name="fade">
                            <!---->
                          </transition-stub>
                        </div>
                        <div class="warning-container">
                          <div class="do-not-forget"><span class="important">DO NOT FORGET</span> to save your password. You will need this to access your wallet.</div>
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
