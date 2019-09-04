import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalDownloadKeystore from "../../src/components/ModalDownloadKeystore.vue";

describe("ModalDownloadKeystore.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const onChange = jest.fn();
        const wrapper = mount(ModalDownloadKeystore, {
            localVue,
            propsData: {
                state: {
                    modalIsOpen: false,
                    isBusy: false
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-create-by-mnemonic-phrase">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">By Keystore File</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                    </svg></header>
                  <div class="main">
                    <div class="content-container">
                      <div class="modal-save-my-keystore-cards"><span class="modal-body-title">Save My Keystore File</span>
                        <div class="modal-card"><img alt="" src="" class="card-image">
                          <div class="card-body-wrapper"><span class="card-header">Don't Lose It</span>
                            <p class="card-body">
                              Be careful, it can not be recovered if you lose it.
                            </p>
                          </div>
                        </div>
                        <div class="modal-card"><img alt="" src="" class="card-image">
                          <div class="card-body-wrapper"><span class="card-header">Don't Share It</span>
                            <p class="card-body">
                              Your funds will be stolen if you use this file on a
                              malicious phishing site.
                            </p>
                          </div>
                        </div>
                        <div class="modal-card"><img alt="" src="" class="card-image">
                          <div class="card-body-wrapper"><span class="card-header">Make a Backup</span>
                            <p class="card-body">
                              Secure it like the millions of dollars it may one
                              day be worth.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="button-container"><button type="submit" class="download-button"><span>Download Keystore File</span>
                          <!----></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
