import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalCreateWithSoftware from "../../../src/components/ModalCreateBySoftware.vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import router from "../../../src/router";
import i18n from "../../../src/i18n";

describe("ModalCreateWithSoftware.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueRouter);
    localVue.use(VueI18n);

    it("renders closed", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalCreateWithSoftware, {
            localVue,
            router,
            i18n,
            propsData: {
                isOpen: false
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(``);
    });

    it("renders open", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalCreateWithSoftware, {
            localVue,
            i18n,
            router,
            propsData: {
                isOpen: true
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" name="ease">
              <div class="modal">
                <header><span class="title">Create with Software</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                  </svg></header>
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
                    <form class="modal-access-by-software">
                      <div class="radio-button-group">
                        <div><label for="file" class="radio-button"><img alt="" src="" class="icon"> <input id="file" type="radio" name="software-access-option" class="input" value="file"> <span class="label">Keystore File</span>
                            <!----></label></div>
                        <div><label for="phrase" class="radio-button"><img alt="" src="" class="icon"> <input id="phrase" type="radio" name="software-access-option" class="input" value="phrase"> <span class="label">Mnemonic Phrase</span>
                            <!----></label></div>
                      </div>
                      <div class="hardware-link"><a href="/hardware-wallet-affiliates" class="">
                          Purchase a hardware wallet
                        </a>
                        for the highest security when accessing your crypto.
                      </div> <button type="submit" disabled="disabled" class=""><span>Continue</span>
                        <!----></button>
                      <div class="customer-support-link support-link">
                        <div class="customer-support-container"><img alt="" src="">Customer Support
                        </div>
                        <!---->
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
