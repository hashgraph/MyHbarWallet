import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import OptionalMemoField from "../../../src/ui/components/OptionalMemoField.vue";
import i18n from "../../../src/service/i18n";

describe("OptionalMemoField.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(OptionalMemoField, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="memo-container">
              <div class="header">
                <div class="text">
                  Memo
                </div>
                <div class="memo-switch">
                  <div class="text">
                    Optional
                  </div> <label class="switch-button btn"><input type="checkbox" class="input"> <span class="thumb"></span>
                    <!---->
                  </label>
                </div>
              </div>
              <div class="memo-input">
                <div class="text-input"><label class="label-container">
                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Memo" type="text" tabindex="-1" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><!----></div></div></span>
                    <!----></span>
                  </label>
                  <!---->
                  <!---->
                </div>
              </div>
            </div>
        `);
    });
});
