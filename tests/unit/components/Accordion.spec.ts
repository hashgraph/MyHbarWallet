import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import Accordion from "../../../src/ui/components/Accordion.vue";
import i18n from "../../../src/service/i18n";

describe("Accordion.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    expect.assertions(1);
    it("renders", (): void => {
        const wrapper = mount(Accordion, {
            localVue,
            i18n,
            slots: {
                title: "Title",
                content: "Content"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="accordion">
              <div class="title">
                <div class="title-text">Title</div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                  <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
                </svg>
              </div>
              <div class="content">
                <div class="content-text">Content</div>
              </div>
            </div>
        `);
    });
});
