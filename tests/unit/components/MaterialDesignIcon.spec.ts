import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import { mdiChevronUp } from "@mdi/js";
import VueI18n from "vue-i18n";

import MaterialDesignIcon from "../../../src/components/MaterialDesignIcon.vue";
import i18n from "../../../src/i18n";

describe("MaterialDesignIcon.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(MaterialDesignIcon, {
            localVue,
            i18n,
            propsData: { icon: mdiChevronUp }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <svg height="24" width="24" viewBox="0 0 24 24" class="">
              <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
            </svg>
        `);
    });

    it("renders spin", (): void => {
        expect.assertions(1);

        const wrapper = mount(MaterialDesignIcon, {
            localVue,
            i18n,
            propsData: {
                spin: true,
                icon: mdiChevronUp
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <svg height="24" width="24" viewBox="0 0 24 24" class="mdi-spin">
              <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
            </svg>
        `);
    });

    it("renders non-default size", (): void => {
        expect.assertions(1);

        const wrapper = mount(MaterialDesignIcon, {
            localVue,
            i18n,
            propsData: {
                size: 12,
                icon: mdiChevronUp
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <svg height="12" width="12" viewBox="0 0 24 24" class="">
              <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
            </svg>
        `);
    });
});
