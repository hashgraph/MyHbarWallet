import { createLocalVue, mount } from "@vue/test-utils";
import Button from "../../../src/components/Button.vue";
import VueCompositionApi from "@vue/composition-api";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("Button.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(Button, {
            localVue,
            i18n,
            propsData: { label: "Choose a Hardware" }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <button type="submit" class="">
              <!----> <span>Choose a Hardware</span>
              <!----></button>
        `);
    });

    it("renders as busy", (): void => {
        expect.assertions(1);

        const wrapper = mount(Button, {
            localVue,
            i18n,
            propsData: {
                label: "Choose a Hardware",
                busy: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <button type="submit" class="busy"><svg width="24" height="24" viewBox="0 0 24 24" class="spinner mdi-spin">
                <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
              </svg>
              <!---->
              <!----></button>
        `);
    });
});
