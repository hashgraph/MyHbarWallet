import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import UnitConverter from "../../../src/components/UnitConverter.vue";
import VueI18n from "vue-i18n";
import i18n from "../../../src/i18n";

describe("UnitConverter.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(UnitConverter, {
            localVue,
            i18n
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="unit-input">
              <div class="wrap">
                <div class="block-left">
                  <div class="input-block">
                    <div class="text-input is-compact is-white"><label class="label-container">
                        <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Amount" type="text" step="any" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><!----></div></div></span>
                        <!----></span></label>
                      <!---->
                      <!---->
                    </div>
                  </div>
                  <div class="select-block">
                    <div class="select" left="true">
                      <div class="select-value-container">
                        <div class="select-value">tinybar</div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                        </svg>
                      </div>
                      <div class="select-menu"></div>
                    </div>
                  </div>
                </div>
                <div class="block-center">
                  <div class="convert-icon"><img src="../assets/swap.svg" alt=""></div>
                </div>
                <div class="block-right">
                  <div class="input-block">
                    <div class="text-input is-compact is-white"><label class="label-container">
                        <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Amount" type="text" step="any" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><!----></div></div></span>
                        <!----></span></label>
                      <!---->
                      <!---->
                    </div>
                  </div>
                  <div class="select-block">
                    <div class="select">
                      <div class="select-value-container">
                        <div class="select-value">hbar</div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                        </svg>
                      </div>
                      <div class="select-menu"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
