import { createLocalVue, mount } from "@vue/test-utils";
import ZoomTopButton from "../../../src/components/ZoomTopButton.vue";
import "../../../src/directives";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import i18n from "../../../src/i18n";

describe("ZoomTopButton", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(ZoomTopButton, {
            localVue,
            i18n,
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <button class=""><svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
              </svg></button>
        `);
    });
});
