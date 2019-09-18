import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalMessageSigned from "../../../src/components/ModalMessageSigned.vue";
import VueI18n from "vue-i18n";
import i18n from "../../../src/i18n";

describe("ModalMessageSigned.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders closed", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const onFocusIn = jest.fn();
        const onFocusOut = jest.fn();
        const onInput = jest.fn();

        const wrapper = mount(ModalMessageSigned, {
            localVue,
            i18n,
            propsData: {
                isOpen: false,
                value: "value"
            },
            listeners: {
                change: onChange,
                focusin: onFocusIn,
                focusout: onFocusOut,
                input: onInput
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div role="dialog" aria-modal="true" class="modal-background">
              <div class="modal">
                <header><span class="title">Signature</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                  </svg></header>
                <div class="main">
                  <div class="content-container">
                    <div class="text-input is-multiline has-label"><label class="label-container"><span class="label">Signed Message</span> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><textarea rows="8" class="text-area"></textarea></div> <div class="deco-flex-item"><!----></div></div></span>
                        <!----></span></label>
                      <div class="actions">
                        <!---->
                        <!---->
                        <div class="action">
                          Copy
                        </div>
                      </div>
                      <!---->
                    </div>
                    <div class="button-container"><button type="submit" class=""><span>Copy</span>
                        <!----></button></div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders open", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalMessageSigned, {
            localVue,
            i18n,
            propsData: {
                isOpen: true,
                value: "value"
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div role="dialog" aria-modal="true" class="modal-background is-open">
              <div class="modal">
                <header><span class="title">Signature</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                  </svg></header>
                <div class="main">
                  <div class="content-container">
                    <div class="text-input is-multiline has-label"><label class="label-container"><span class="label">Signed Message</span> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><textarea rows="8" class="text-area"></textarea></div> <div class="deco-flex-item"><!----></div></div></span>
                        <!----></span></label>
                      <div class="actions">
                        <!---->
                        <!---->
                        <div class="action">
                          Copy
                        </div>
                      </div>
                      <!---->
                    </div>
                    <div class="button-container"><button type="submit" class=""><span>Copy</span>
                        <!----></button></div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
