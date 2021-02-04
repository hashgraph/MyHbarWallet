import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ModalDownloadKeystore from "../../../src/ui/components/ModalDownloadKeystore.vue";
import i18n from "../../../src/service/i18n";

describe("ModalDownloadKeystore.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders, open, not busy", async(): Promise<void> => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalDownloadKeystore, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: true,
                    isBusy: false
                }
            },
            listeners: { change: onChange }
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
                    <header><span class="title">By Keystore File</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <!---->
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
                        </div>
                        <div class="button-container"><button type="submit" class="download-button compact">
                            <!----> <span>Download Keystore File</span>
                            <!---->
                          </button> <button type="submit" disabled="disabled" class="continue-button compact">
                            <!----> <span>Continue</span>
                            <!---->
                          </button></div>
                      </div>
                    </div>
                  </div>
                </transition-stub>
              </div>
            </transition-stub>
        `);
    });

    it("renders, open, busy", async(): Promise<void> => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalDownloadKeystore, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: true,
                    isBusy: true
                }
            },
            listeners: { change: onChange }
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
                    <header><span class="title">By Keystore File</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <!---->
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
                        </div>
                        <div class="button-container"><button type="submit" disabled="disabled" class="download-button busy compact"><svg width="24" height="24" viewBox="0 0 24 24" class="spinner mdi-spin">
                              <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
                            </svg>
                            <!---->
                            <!---->
                          </button> <button type="submit" disabled="disabled" class="continue-button compact">
                            <!----> <span>Continue</span>
                            <!---->
                          </button></div>
                      </div>
                    </div>
                  </div>
                </transition-stub>
              </div>
            </transition-stub>
        `);
    });
});
