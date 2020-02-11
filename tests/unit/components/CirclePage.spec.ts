import { createLocalVue, mount } from "@vue/test-utils";
import CirclePage from "../../../src/components/CirclePage.vue";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import i18n from "../../../src/i18n";

describe("CirclePage.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(CirclePage, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(
            "<div class=\"circle-page\"></div>"
        );
    });
});
