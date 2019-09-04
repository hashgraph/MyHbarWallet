import { createLocalVue, mount } from "@vue/test-utils";
import InterFaceDeployContract from "../../src/views/InterfaceDeployContract.vue";
import TextInput from "../../src/components/TextInput.vue";
import VueCompositionApi from "@vue/composition-api";

describe("InterFaceDeployContract", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const wrapper = mount(InterFaceDeployContract, {
            localVue,
            components: {
                TextInput
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="interface-form">
              <div class="interface-form-title-container">
                <div class="interface-form-title">Deploy Contract</div> <button type="submit" class=""><span>Menu</span>
                  <!----></button>
              </div>
              <div class="interface-form-container">
                <div class="form-main">
                  <div class="text-input deploy-contract-form-item is-compact is-multiline has-label"><label class="label-container"><span class="label">Byte Code</span> <span class="input-container"><!----> <span class="input-wrapper"><textarea rows="2" class="text-area"></textarea> <span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></span>
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
                  <div class="text-input deploy-contract-form-item is-multiline has-label"><label class="label-container"><span class="label">ABI/JSON Interface</span> <span class="input-container"><!----> <span class="input-wrapper"><textarea rows="8" class="text-area"></textarea> <span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></span>
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
                  <div class="text-input deploy-contract-form-item has-label"><label class="label-container"><span class="label">Maximum Transaction Fee</span> <span class="input-container"><!----> <span class="input-wrapper"><input type="text" autocomplete="on"> <span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></span>
                      <!----></span></label>
                    <div class="actions">
                      <!---->
                      <!---->
                      <!---->
                    </div>
                    <!---->
                  </div>
                </div>
                <div class="form-footer"><button type="submit" disabled="disabled" class=""><span>Sign Transaction</span>
                    <!----></button></div>
              </div>
            </div>
        `);
    });
});
