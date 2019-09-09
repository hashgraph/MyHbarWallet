import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import PageTitle from "../../../src/components/PageTitle.vue";
import VueI18n from "vue-i18n";
import i18n from "../../../src/i18n";

describe("PageTitle.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(PageTitle, {
            localVue,
            i18n,
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
        expect.assertions(1);

        const wrapper = mount(PageTitle, {
            localVue,
            i18n,
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
