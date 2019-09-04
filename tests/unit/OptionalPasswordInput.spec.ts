import { shallowMount } from "@vue/test-utils";
import OptionalPasswordInput from "../../src/components/OptionalPasswordInput.vue";

describe("OptionalPasswordInput", (): void => {
    it("renders", (): void => {
        const wrapper = shallowMount(OptionalPasswordInput, {
            propsData: {
                value: ""
            },
            data(): {
                showPassword: boolean;
            } {
                return {
                    showPassword: true
                };
            },
            methods: {
                handleInput: (): void => {
                    return;
                },
                handleChangeShowPassword: (): void => {
                    return;
                }
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
                  <switchbutton-stub value="true" class="btn"></switchbutton-stub>
                </div>
              </div>
              <div class="password-input expanded">
                <textinput-stub placeholder="Please Enter Password" value="" compact="true" obscure="true"></textinput-stub>
                <div class="password-warning">
                  <p></p>
                </div>
              </div>
            </div>
        `);
    });
});
