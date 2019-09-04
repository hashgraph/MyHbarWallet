import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import PageTitle from "../../src/components/PageTitle.vue";

describe("PageTitle.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const wrapper = mount(PageTitle, {
            localVue,
            propsData: {
                title: "title",
                large: false
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="title-container">
              <div class="title">title</div>
              <div class="subtitle"></div>
            </div>
        `);
    });

    it("renders large", (): void => {
        const wrapper = mount(PageTitle, {
            localVue,
            propsData: {
                title: "title",
                large: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="title-container">
              <div class="title large">title</div>
              <div class="subtitle"></div>
            </div>
        `);
    });
});
