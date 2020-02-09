import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalAccessByHardware from "../../../src/components/ModalAccessByHardware.vue";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("ModalAccessByHardware.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders open, not busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByHardware, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: true,
                    isBusy: false,
                    optionSelected: "",
                    disableButton: false
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background">
              <div class="modal">
                <header><span class="title">Access by Hardware</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                  </svg></header>
                <!---->
                <div class="main">
                  <div class="content-container">
                    <form class="modal-access-by-hardware">
                      <div class="radio-button-group">
                        <div><label for="ledger" class="radio-button"><img alt="" src="" class="icon"> <input id="ledger" type="radio" name="hardware-access-option" class="input" value="ledger"> <span class="label">Ledger</span>
                            <!----></label></div>
                      </div>
                      <div class="instructions">
                        <div>Continue</div>
                      </div>
                      <div class="instructions bold">
                        <div>Please use Chrome to continue.</div>
                      </div>
                      <div class="instructions bold">
                        <div>Watch for prompts on your hardware wallet.</div>
                      </div> <button type="submit" disabled="disabled" class="button-choose-a-hardware">
                        <!----> <span>Continue</span>
                        <!----></button>
                      <div class="customer-support-link">
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

    it("renders closed, not busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByHardware, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: false,
                    isBusy: false,
                    optionSelected: "",
                    disableButton: false
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(``);
    });

    it("renders open, busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByHardware, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: true,
                    isBusy: true,
                    optionSelected: "",
                    disableButton: false
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background">
              <div class="modal">
                <header><span class="title">Access by Hardware</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                  </svg></header>
                <!---->
                <div class="main">
                  <div class="content-container">
                    <form class="modal-access-by-hardware">
                      <div class="radio-button-group">
                        <div><label for="ledger" class="radio-button"><img alt="" src="" class="icon"> <input id="ledger" type="radio" name="hardware-access-option" class="input" value="ledger"> <span class="label">Ledger</span>
                            <!----></label></div>
                      </div>
                      <div class="instructions">
                        <div>Continue</div>
                      </div>
                      <div class="instructions bold">
                        <div>Please use Chrome to continue.</div>
                      </div>
                      <div class="instructions bold">
                        <div>Watch for prompts on your hardware wallet.</div>
                      </div> <button type="submit" disabled="disabled" class="button-choose-a-hardware busy"><svg width="24" height="24" viewBox="0 0 24 24" class="spinner mdi-spin">
                          <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
                        </svg>
                        <!---->
                        <!----></button>
                      <div class="customer-support-link">
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

    it("renders closed, busy", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByHardware, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: false,
                    isBusy: true,
                    optionSelected: "",
                    disableButton: false
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(``);
    });
});
