import OptionalPasswordInput from "../../../src/components/OptionalPasswordInput.vue";
import VueCompositionApi from "@vue/composition-api";
import { createLocalVue, mount } from "@vue/test-utils";
import i18n from "../../../src/i18n";

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
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                <textinput-stub placeholder="Please Enter Password" value="" tabindex="-1" compact="true" obscure="true"></textinput-stub>
                <div class="password-warning">
                  <p></p>
                </div>
              </div>
            </div>
        `);
    });
});
