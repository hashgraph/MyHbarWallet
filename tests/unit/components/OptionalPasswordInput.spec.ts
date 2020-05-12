import VueCompositionApi from "@vue/composition-api";
import { createLocalVue, mount } from "@vue/test-utils";

import OptionalPasswordInput from "../../../src/ui/components/OptionalPasswordInput.vue";
import i18n from "../../../src/service/i18n";

describe("OptionalPasswordInput", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const wrapper = mount(OptionalPasswordInput, {
            propsData: { value: "", passwordWarning: null },
            localVue,
            i18n,
            methods: {
                // This test has warnings if the values aren't defined
                // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
                handleChangeShowPassword(showPassword: boolean): void {}
            },
            stubs: {
                TextInput: true,
                SwitchButton: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="password-container">
              <div class="header">
                <div class="text">
                  Password
                </div>
                <div class="password-switch">
                  <div class="text">
                    Optional
                  </div>
                  <switchbutton-stub class="btn"></switchbutton-stub>
                </div>
              </div>
              <div class="password-input">
                <transition-stub name="fade">
                  <textinput-stub placeholder="Please Enter Password" value="" tabindex="-1" compact="true" obscure="true"></textinput-stub>
                </transition-stub>
                <transition-stub name="fade">
                  <div class="password-warning">
                    <p></p>
                  </div>
                </transition-stub>
              </div>
            </div>
        `);
    });
});
