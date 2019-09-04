import { createLocalVue, mount } from "@vue/test-utils";
import InterfaceVerifyMessage from "../../src/views/InterfaceVerifyMessage.vue";
import VueCompositionApi from "@vue/composition-api";

describe("InterfaceVerifyMessage.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const wrapper = mount(InterfaceVerifyMessage, {
            localVue
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="verify-message">
              <div class="interface-form">
                <div class="interface-form-title-container">
                  <div class="interface-form-title">Verify Message</div> <button type="submit" class=""><span>Menu</span>
                    <!----></button>
                </div>
                <div class="interface-form-container">
                  <div class="form-main">
                    <div class="text-input is-multiline has-label"><label class="label-container"><span class="label">Signature</span> <span class="input-container"><!----> <span class="input-wrapper"><textarea rows="8" class="text-area"></textarea> <!----></span>
                        <!----></span></label>
                      <div class="actions">
                        <!---->
                        <div class="action">
                          Clear
                        </div>
                        <div class="action">
                          Copy
                        </div>
                      </div>
                      <!---->
                    </div>
                  </div>
                  <div class="form-footer"><button type="submit" disabled="disabled" class=""><span>Verify Message</span>
                      <!----></button></div>
                </div>
              </div>
            </div>
        `);
    });
});
