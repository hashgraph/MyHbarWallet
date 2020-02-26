import { createLocalVue, mount } from "@vue/test-utils";
import PasswordGenerator from "../../../src/components/PasswordGenerator.vue";
import VueCompositionApi from "@vue/composition-api";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("PasswordGenerator.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(PasswordGenerator, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <form>
              <div class="password-with-confirm">
                <div class="text-input input"><label class="label-container">
                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Please Enter At Least 9 Characters" type="password" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="eye"><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path></svg></span></div>
              </div></span>
              <!----></span></label>
              <!---->
              <!---->
              </div>
              <div class="text-input"><label class="label-container">
                  <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Confirm Password" type="password" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="eye"><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path></svg></span></div>
              </div></span>
              <!----></span></label>
              <!---->
              <!---->
              </div>
              <!---->
              <!---->
              <!---->
              </div>
              <div class="btn-container"><button type="submit" disabled="disabled" class="btn">
                  <!----> <span>Next</span> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                  </svg></button></div>
            </form>
        `);
    });
});
