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
                  <header><span class="title">By Keystore File</span>
                    <!---->
                  </header>
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
                      <div class="button-container"><button type="submit" class="download-button compact"><span>Download Keystore File</span>
                          <!----></button> <button type="submit" disabled="disabled" class="continue-button compact"><span>Continue</span>
                          <!----></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
