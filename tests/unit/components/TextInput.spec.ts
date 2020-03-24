import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import TextInput from "../../../src/ui/components/TextInput.vue";
import i18n from "../../../src/service/i18n";

describe("TextInput.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const value = "12345";
        const wrapper = mount(TextInput, {
            localVue,
            i18n,
            propsData: { value }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><!----></div></div></span>
                <!----></span></label>
              <!---->
              <!---->
            </div>
        `);
    });

    it("renders obscured", (): void => {
        expect.assertions(1);

        const value = "super-secure-password";
        const wrapper = mount(TextInput, {
            localVue,
            i18n,
            propsData: {
                obscure: true,
                value
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input type="password" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="eye"><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path></svg></span></div>
            </div></span>
            <!----></span></label>
            <!---->
            <!---->
            </div>
        `);
    });

    it("renders multiline", (): void => {
        expect.assertions(1);

        const placeholder = "placeholder text";
        const value = "textarea text";
        const wrapper = mount(TextInput, {
            localVue,
            i18n,
            propsData: {
                multiline: true,
                placeholder,
                value
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input is-multiline"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><textarea placeholder="placeholder text" rows="8" class="text-area"></textarea></div> <div class="deco-flex-item"><!----></div></div></span>
                <!----></span></label>
              <!---->
              <!---->
            </div>
        `);
    });

    it("renders label", (): void => {
        expect.assertions(1);

        const label = "label text";
        const wrapper = mount(TextInput, {
            localVue,
            i18n,
            propsData: {
                multiline: true,
                label
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input is-multiline has-label"><label class="label-container"><span class="label">label text</span> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><textarea rows="8" class="text-area"></textarea></div> <div class="deco-flex-item"><!----></div></div></span>
                <!----></span></label>
              <div class="actions">
                <!---->
                <!---->
                <!---->
              </div>
              <!---->
            </div>
        `);
    });

    it("renders validation indicator", (): void => {
        expect.assertions(1);

        const showValidation = true;
        const valid = true;
        const wrapper = mount(TextInput, {
            localVue,
            i18n,
            propsData: {
                multiline: true,
                showValidation,
                valid
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input is-multiline"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><textarea rows="8" class="text-area"></textarea></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark is-valid"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
            </div></span>
            <!----></span></label>
            <!---->
            <!---->
            </div>
        `);
    });

    it("renders copy action", (): void => {
        expect.assertions(1);

        const canCopy = true;
        const wrapper = mount(TextInput, {
            localVue,
            i18n,
            propsData: {
                multiline: true,
                label: "",
                canCopy
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input is-multiline has-label"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><textarea rows="8" class="text-area"></textarea></div> <div class="deco-flex-item"><!----></div></div></span>
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
        `);
    });

    it("renders clear action", (): void => {
        expect.assertions(1);

        const canClear = true;
        const wrapper = mount(TextInput, {
            localVue,
            i18n,
            propsData: {
                multiline: true,
                label: "",
                canClear
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input is-multiline has-label"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><textarea rows="8" class="text-area"></textarea></div> <div class="deco-flex-item"><!----></div></div></span>
                <!----></span></label>
              <div class="actions">
                <!---->
                <div class="action">
                  Clear
                </div>
                <!---->
              </div>
              <!---->
            </div>
        `);
    });

    it("renders error message", (): void => {
        expect.assertions(1);

        const error = "ERROR: foo";
        const wrapper = mount(TextInput, {
            localVue,
            i18n,
            propsData: {
                multiline: true,
                error,
                valid: false,
                showValidation: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input is-multiline has-error"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><textarea rows="8" class="text-area"></textarea></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
            </div></span>
            <!----></span></label>
            <!---->
            <div class="error">
              ERROR: foo
            </div>
            </div>
        `);
    });
});
