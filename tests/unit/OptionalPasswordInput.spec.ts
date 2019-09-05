import { mount } from "@vue/test-utils";
import OptionalPasswordInput from "../../src/components/OptionalPasswordInput.vue";

describe("OptionalPasswordInput", (): void => {
    it("renders", (): void => {
        const wrapper = mount(OptionalPasswordInput, {
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
                  </div> <label class="switch-button btn"><input type="checkbox" class="input"> <span class="thumb"></span>
                    <!----></label>
                </div>
              </div>
              <div class="password-input expanded">
                <div class="text-input"><label class="label-container">
                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Please Enter Password" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                    <!----></span></label>
                  <!---->
                  <!---->
                </div>
                <div class="password-warning">
                  <p></p>
                </div>
              </div>
            </div>
        `);
    });
});
