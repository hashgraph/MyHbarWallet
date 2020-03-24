import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import CommunitySocialIcon from "../../../src/ui/components/CommunitySocialIcon.vue";
import i18n from "../../../src/service/i18n";

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
            <a href="" target="_blank" rel="noopener" class="social-icon">
              <div class="link-content"><img src="https://via.placeholder.com/150" alt="">
                name
              </div>
            </a>
        `);
    });
});
