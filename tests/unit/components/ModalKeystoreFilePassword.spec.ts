import ModalPassword from "../../../src/components/ModalKeystoreFilePassword.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import i18n from "../../../src/i18n";

describe("ModalKeystoreFilePassword.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders closed, short password, not busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const state = {
            isOpen: false,
            password: "",
            isBusy: false
        };
        const wrapper = mount(ModalPassword, {
            localVue,
            i18n,
            propsData: {
                state
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-password">
              <!---->
            </div>
        `);
    });

    it("renders open, short password, not busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const state = {
            isOpen: true,
            password: "",
            isBusy: false
        };
        const wrapper = mount(ModalPassword, {
            localVue,
            i18n,
            propsData: {
                state
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-password">
              <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" name="ease">
                <div class="modal">
                  <header><span class="title">Password</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                    </svg></header>
                  <!---->
                  <div class="main">
                    <div class="warning">
                      <div class="notice">
                        <div class="symbol-container"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                            <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path>
                          </svg></div>
                        <div class="text">
                          <div class="title">
                            NOT RECOMMENDED
                          </div>
                          <div class="message">
                            This is not a recommended way to access your wallet. Due to the sensitivity of the information involved, these options should only be used in offline settings by experienced users.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="content-container">
                      <form>
                        <div class="text-input input"><label class="label-container">
                            <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Please Enter At Least 9 Characters" type="password" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="eye"><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path></svg></span></div>
                    </div></span>
                    <!----></span></label>
                    <!---->
                    <!---->
                  </div> <button type="submit" disabled="disabled" class="btn">
                    <!----> <span>Access Wallet</span>
                    <!----></button></form>
                </div>
              </div>
            </div>
            </div>
            </div>
        `);
    });

    it("renders closed, long password, not busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const state = {
            isOpen: false,
            password: "123456789",
            isBusy: false
        };
        const wrapper = mount(ModalPassword, {
            localVue,
            i18n,
            propsData: {
                state
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-password">
              <!---->
            </div>
        `);
    });

    it("renders open, long password, not busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const state = {
            isOpen: true,
            password: "123456789",
            isBusy: false
        };
        const wrapper = mount(ModalPassword, {
            localVue,
            i18n,
            propsData: {
                state
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-password">
              <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" name="ease">
                <div class="modal">
                  <header><span class="title">Password</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                    </svg></header>
                  <!---->
                  <div class="main">
                    <div class="warning">
                      <div class="notice">
                        <div class="symbol-container"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                            <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path>
                          </svg></div>
                        <div class="text">
                          <div class="title">
                            NOT RECOMMENDED
                          </div>
                          <div class="message">
                            This is not a recommended way to access your wallet. Due to the sensitivity of the information involved, these options should only be used in offline settings by experienced users.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="content-container">
                      <form>
                        <div class="text-input input"><label class="label-container">
                            <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Please Enter At Least 9 Characters" type="password" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="eye"><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path></svg></span></div>
                    </div></span>
                    <!----></span></label>
                    <!---->
                    <!---->
                  </div> <button type="submit" class="btn">
                    <!----> <span>Access Wallet</span>
                    <!----></button></form>
                </div>
              </div>
            </div>
            </div>
            </div>
        `);
    });

    it("renders closed, short password, busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const state = {
            isOpen: false,
            password: "",
            isBusy: true
        };
        const wrapper = mount(ModalPassword, {
            localVue,
            i18n,
            propsData: {
                state
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-password">
              <!---->
            </div>
        `);
    });

    it("renders open, short password, busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const state = {
            isOpen: true,
            password: "",
            isBusy: true
        };
        const wrapper = mount(ModalPassword, {
            localVue,
            i18n,
            propsData: {
                state
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-password">
              <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" name="ease">
                <div class="modal">
                  <header><span class="title">Password</span>
                    <!---->
                  </header>
                  <!---->
                  <div class="main">
                    <div class="warning">
                      <div class="notice">
                        <div class="symbol-container"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                            <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path>
                          </svg></div>
                        <div class="text">
                          <div class="title">
                            NOT RECOMMENDED
                          </div>
                          <div class="message">
                            This is not a recommended way to access your wallet. Due to the sensitivity of the information involved, these options should only be used in offline settings by experienced users.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="content-container">
                      <form>
                        <div class="text-input input"><label class="label-container">
                            <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Please Enter At Least 9 Characters" type="password" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="eye"><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path></svg></span></div>
                    </div></span>
                    <!----></span></label>
                    <!---->
                    <!---->
                  </div> <button type="submit" disabled="disabled" class="btn busy"><svg width="24" height="24" viewBox="0 0 24 24" class="spinner mdi-spin">
                      <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
                    </svg>
                    <!---->
                    <!----></button></form>
                </div>
              </div>
            </div>
            </div>
            </div>
        `);
    });

    it("renders closed, long password, busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const state = {
            isOpen: false,
            password: "123456789",
            isBusy: true
        };
        const wrapper = mount(ModalPassword, {
            localVue,
            i18n,
            propsData: {
                state
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-password">
              <!---->
            </div>
        `);
    });

    it("renders open, long password, busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const state = {
            isOpen: true,
            password: "123456789",
            isBusy: true
        };
        const wrapper = mount(ModalPassword, {
            localVue,
            i18n,
            propsData: {
                state
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-password">
              <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" name="ease">
                <div class="modal">
                  <header><span class="title">Password</span>
                    <!---->
                  </header>
                  <!---->
                  <div class="main">
                    <div class="warning">
                      <div class="notice">
                        <div class="symbol-container"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                            <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path>
                          </svg></div>
                        <div class="text">
                          <div class="title">
                            NOT RECOMMENDED
                          </div>
                          <div class="message">
                            This is not a recommended way to access your wallet. Due to the sensitivity of the information involved, these options should only be used in offline settings by experienced users.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="content-container">
                      <form>
                        <div class="text-input input"><label class="label-container">
                            <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Please Enter At Least 9 Characters" type="password" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="eye"><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path></svg></span></div>
                    </div></span>
                    <!----></span></label>
                    <!---->
                    <!---->
                  </div> <button type="submit" class="btn busy"><svg width="24" height="24" viewBox="0 0 24 24" class="spinner mdi-spin">
                      <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
                    </svg>
                    <!---->
                    <!----></button></form>
                </div>
              </div>
            </div>
            </div>
            </div>
        `);
    });
});
