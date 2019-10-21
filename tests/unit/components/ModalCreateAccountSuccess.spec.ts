import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalCreateAccountSuccess from "../../../src/components/ModalCreateAccountSuccess.vue";
import VueRouter from "vue-router";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("ModalCreateAccountSuccess.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueRouter);
    localVue.use(VueI18n);

    const ACCOUNT_ID = "999.999.999";

    it("renders closed", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalCreateAccountSuccess, {
            localVue,
            i18n,
            propsData: {
                isOpen: false,
                accountId: ACCOUNT_ID
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="create-account-success">
              <!---->
            </div>
        `);
    });

    it("renders open", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalCreateAccountSuccess, {
            localVue,
            i18n,
            propsData: {
                isOpen: true,
                accountId: ACCOUNT_ID
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="create-account-success">
              <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background" name="ease">
                <div class="modal">
                  <!---->
                  <div class="main">
                    <div class="content-container">
                      <div class="container"><svg width="200" height="200" viewBox="0 0 24 24" class="large-checkbox">
                          <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
                        </svg>
                        <div class="title">
                          Success
                        </div>
                        <div class="read-only-input center">
                          <div class="value">
                            999.999.999
                          </div>
                          <!---->
                        </div> <button type="submit" class="btn outline">
                          <!----> <span>Copy</span>
                          <!----></button>
                        <div class="close">
                          Dismiss
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
