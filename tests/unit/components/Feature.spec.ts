import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import Feature from "../../../src/components/Feature.vue";
import i18n from "../../../src/i18n";

describe("Feature.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(Feature, {
            localVue,
            i18n,
            propsData: {
                image: "https://via.placeholder.com/150",
                title: "title"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="feature"><img src="https://via.placeholder.com/150" alt="" class="image">
              <div class="text">
                <div class="header">
                  title
                </div>
                <div class="content"></div>
              </div>
            </div>
        `);
    });
});
