import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalDownloadKeystore from "../../src/components/ModalDownloadKeystore.vue";

describe("ModalDownloadKeystore.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders, closed, not busy", (): void => {
        expect.assertions(1);

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

    it("renders, open, not busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalDownloadKeystore, {
            localVue,
            propsData: {
                state: {
                    modalIsOpen: true,
                    isBusy: false
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-create-by-mnemonic-phrase">
              <div role="dialog" aria-modal="true" class="modal-background is-open">
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

    it("renders, closed, busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalDownloadKeystore, {
            localVue,
            propsData: {
                state: {
                    modalIsOpen: false,
                    isBusy: true
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
                      <div class="button-container"><button type="submit" disabled="disabled" class="download-button busy compact"><svg width="24" height="24" viewBox="0 0 24 24" class="spinner mdi-spin">
                            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
                          </svg>
                          <!----></button> <button type="submit" disabled="disabled" class="continue-button compact"><span>Continue</span>
                          <!----></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders, open, busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalDownloadKeystore, {
            localVue,
            propsData: {
                state: {
                    modalIsOpen: true,
                    isBusy: true
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-create-by-mnemonic-phrase">
              <div role="dialog" aria-modal="true" class="modal-background is-open">
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
                      <div class="button-container"><button type="submit" disabled="disabled" class="download-button busy compact"><svg width="24" height="24" viewBox="0 0 24 24" class="spinner mdi-spin">
                            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
                          </svg>
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
