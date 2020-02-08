import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import CommunitySocialIcon from "../../../src/components/CommunitySocialIcon.vue";
import i18n from "../../../src/i18n";

describe("CommunitySocialIcon.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(CommunitySocialIcon, {
            localVue,
            i18n,
            propsData: {
                name: "name",
                image: "https://via.placeholder.com/150"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <a rel="noopener" target="_blank" class="social-icon">
              <div class="link-content"><img src="https://via.placeholder.com/150" alt="">
                name
              </div>
            </a>
        `);
    });
});
