import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ModalAccessByHardware from "../../../src/ui/components/ModalAccessByHardware.vue";
import i18n from "../../../src/service/i18n";

describe("ModalAccessByHardware.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders open, not busy", async (): Promise<void> => {
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
            listeners: { change: onChange },
            stubs: { CustomerSupportLink: true }
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const modal = wrapper.vm.$children.find(
            child => child.$options.name === "Modal"
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
                    <header><span class="title">Access by Hardware</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <!---->
                    <div class="main">
                      <div class="content-container">
                        <form class="modal-access-by-hardware">
                          <div class="radio-button-group">
                            <div><label for="ledger" class="radio-button"><img alt="" src="" class="icon"> <input id="ledger" type="radio" name="hardware-access-option" class="input" value="ledger"> <span class="label">Ledger</span>
                                <!---->
                              </label></div>
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
                            <!---->
                          </button>
                          <customersupportlink-stub></customersupportlink-stub>
                        </form>
                      </div>
                    </div>
                  </div>
                </transition-stub>
              </div>
            </transition-stub>
        `);
    });

    it("renders open, busy", async (): Promise<void> => {
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
            listeners: { change: onChange },
            stubs: { CustomerSupportLink: true }
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const modal = wrapper.vm.$children.find(
            child => child.$options.name === "Modal"
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
                    <header><span class="title">Access by Hardware</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <!---->
                    <div class="main">
                      <div class="content-container">
                        <form class="modal-access-by-hardware">
                          <div class="radio-button-group">
                            <div><label for="ledger" class="radio-button"><img alt="" src="" class="icon"> <input id="ledger" type="radio" name="hardware-access-option" class="input" value="ledger"> <span class="label">Ledger</span>
                                <!---->
                              </label></div>
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
                            <!---->
                          </button>
                          <customersupportlink-stub></customersupportlink-stub>
                        </form>
                      </div>
                    </div>
                  </div>
                </transition-stub>
              </div>
            </transition-stub>
        `);
    });
});
