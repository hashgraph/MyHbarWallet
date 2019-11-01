import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalAccessBySoftware from "../../../src/components/ModalAccessBySoftware.vue";
import VueRouter from "vue-router";
import router from "../../../src/router";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("ModalAccessBySoftware.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueRouter);
    localVue.use(VueI18n);

    it("renders closed", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessBySoftware, {
            localVue,
            i18n,
            router,
            propsData: {
                isOpen: false
            },
            listeners: {
                change: onChange
            },
            stubs: {
                MaterialDesignIcon: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-access-by-software">
              <!---->
            </div>
        `);
    });

    it("renders open", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessBySoftware, {
            localVue,
            i18n,
            router,
            propsData: {
                isOpen: true
            },
            listeners: {
                change: onChange
            },
            stubs: {
                MaterialDesignIcon: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-access-by-software">
              <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" name="ease">
                <div class="modal">
                  <header><span class="title">Software Account Access</span>
                    <materialdesignicon-stub icon="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" class="close"></materialdesignicon-stub>
                  </header>
                  <div class="main">
                    <div class="content-container">
                      <form class="modal-access-by-software">
                        <div class="radio-button-group">
                          <div><label for="file" class="radio-button"><img alt="" src="" class="icon"> <input id="file" type="radio" name="software-access-option" class="input" value="file"> <span class="label">Keystore File</span>
                              <!----></label></div>
                          <div><label for="phrase" class="radio-button"><img alt="" src="" class="icon"> <input id="phrase" type="radio" name="software-access-option" class="input" value="phrase"> <span class="label">Mnemonic Phrase</span>
                              <!----></label></div>
                          <div><label for="key" class="radio-button"><img alt="" src="" class="icon"> <input id="key" type="radio" name="software-access-option" class="input" value="key"> <span class="label">Private Key</span>
                              <!----></label></div>
                        </div>
                        <div class="hardware-link"><a href="/hardware-wallet-affiliates" class="">
                            Purchase a hardware wallet
                          </a>
                          for the highest security when accessing your crypto.
                        </div> <button type="submit" disabled="disabled" class="">
                          <!----> <span>Continue</span>
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
            </div>
        `);
    });
});
