import { createLocalVue, mount } from "@vue/test-utils";
import TextInput from "../../src/components/TextInput.vue";
import VueCompositionApi from "@vue/composition-api";

describe("TextInput.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const value = "12345";
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                value
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><input type="text" autocomplete="on"> <!----></span>
                <!----></span></label>
              <!---->
              <!---->
            </div>
        `);
    });

    it("renders a password", (): void => {
        const value = "super-secure-password";
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                obscure: true,
                value
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><input type="password" autocomplete="on"> <span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="eye"><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path></svg></span></span>
                <!----></span></label>
              <!---->
              <!---->
            </div>
        `);

        // Expose the password
        wrapper.find(".eye").trigger("click");

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><input type="text" autocomplete="on"> <span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="eye is-open"><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path></svg></span></span>
                <!----></span></label>
              <!---->
              <!---->
            </div>
        `);
    });

    it("renders multiline", (): void => {
        const placeholder = "placeholder text";
        const value = "textarea text";
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                placeholder,
                value
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input is-multiline"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><textarea placeholder="placeholder text" rows="8" class="text-area"></textarea> <!----></span>
                <!----></span></label>
              <!---->
              <!---->
            </div>
        `);
    });

    it("renders label", (): void => {
        const label = "label text";
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                label
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input is-multiline has-label"><label class="label-container"><span class="label">label text</span> <span class="input-container"><!----> <span class="input-wrapper"><textarea rows="8" class="text-area"></textarea> <!----></span>
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
        const showValidation = true;
        const valid = true;
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                showValidation,
                valid
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input is-multiline"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><textarea rows="8" class="text-area"></textarea> <span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark is-valid"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></span>
                <!----></span></label>
              <!---->
              <!---->
            </div>
        `);
    });

    it("renders copy action", (): void => {
        const canCopy = true;
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                label: "",
                canCopy
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input is-multiline has-label"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><textarea rows="8" class="text-area"></textarea> <!----></span>
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
        const canClear = true;
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                label: "",
                canClear
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input is-multiline has-label"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><textarea rows="8" class="text-area"></textarea> <!----></span>
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
        const error = "ERROR: foo";
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                error,
                valid: false,
                showValidation: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="text-input is-multiline has-error"><label class="label-container">
                <!----> <span class="input-container"><!----> <span class="input-wrapper"><textarea rows="8" class="text-area"></textarea> <span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></span>
                <!----></span></label>
              <!---->
              <div class="error">
                ERROR: foo
              </div>
            </div>
        `);
    });
});
