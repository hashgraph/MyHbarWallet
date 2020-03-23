import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import OptionalPasswordWithConfirm from "../../../src/ui/components/OptionalPasswordWithConfirm.vue";
import i18n from "../../../src/service/i18n";

describe("OptionalPasswordWithConfirm.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(OptionalPasswordWithConfirm, {
            localVue,
            i18n
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
              <div class="password-input">
                <!---->
                <div class="password-warning">
                  <p></p>
                </div>
              </div>
            </div>
        `);
    });
});
