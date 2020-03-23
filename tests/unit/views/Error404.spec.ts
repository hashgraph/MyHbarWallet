import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import Error404 from "../../../src/ui/views/Error404.vue";
import i18n from "../../../src/service/i18n";

describe("Error404.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(Error404, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="error-404">
              <div class="error-container">
                <div class="error-code">
                  404
                </div>
                <div class="error-description">
                  Oops! Looks like you're lost.
                </div>
              </div>
            </div>
        `);
    });
});
