import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalAccessByHardware from "../../src/components/ModalAccessByHardware.vue";

describe("ModalAccessByHardware.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByHardware, {
            localVue,
            propsData: {
                isOpen: false
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div role="dialog" aria-modal="true" class="modal-background">
              <div class="modal">
                <header><span class="title">Access by hardware</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                  </svg></header>
                <div class="main">
                  <div class="content-container">
                    <form class="modal-access-by-hardware">
                      <div class="radio-button-group">
                        <div><label for="trezor" class="radio-button"><img alt="" src="" class="icon"> <input id="trezor" type="radio" name="hardware-access-option" class="input" value="trezor"> <span class="label">Trezor</span>
                            <!----></label></div>
                      </div> <button type="submit" disabled="disabled" class="button-choose-a-hardware"><span>Choose a Hardware</span>
                        <!----></button>
                      <div class="customer-support-link"><img alt="" src=""> Customer Support
                        <div role="dialog" aria-modal="true" class="modal-background">
                          <div class="modal">
                            <header><span class="title">Issue Information</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                              </svg></header>
                            <div class="main">
                              <div class="content-container">
                                <form class="modal-issue-information">
                                  <div class="text-input issue-item"><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Browser" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                                      <!----></span></label>
                                    <!---->
                                    <!---->
                                  </div>
                                  <div class="text-input issue-item"><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Operating System" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                                      <!----></span></label>
                                    <!---->
                                    <!---->
                                  </div>
                                  <div class="text-input issue-item"><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Device/Wallet type (if any)" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                                      <!----></span></label>
                                    <!---->
                                    <!---->
                                  </div>
                                  <div class="text-input issue-item"><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Account ID (if any)" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                                      <!----></span></label>
                                    <!---->
                                    <!---->
                                  </div>
                                  <div class="text-input issue-item"><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="URL" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                                      <!----></span></label>
                                    <!---->
                                    <!---->
                                  </div>
                                  <div class="text-input issue-item is-multiline"><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><textarea placeholder="Describe the issue" rows="8" class="text-area resize"></textarea></div> <div class="deco-flex-item"><!----></div></div></span>
                                      <!----></span></label>
                                    <!---->
                                    <!---->
                                  </div> <button type="submit" class="send-button compact"><span>Send</span>
                                    <!----></button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
