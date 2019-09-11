import { createLocalVue, mount } from "@vue/test-utils";
import Accordion from "../../src/components/Accordion.vue";
import VueCompositionApi from "@vue/composition-api";

describe("Accordion.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    expect.assertions(1);
    it("renders", (): void => {
        const wrapper = mount(Accordion, {
            localVue,
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
