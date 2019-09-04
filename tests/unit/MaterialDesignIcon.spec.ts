import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import MaterialDesignIcon from "../../src/components/MaterialDesignIcon.vue";
import { mdiChevronUp } from "@mdi/js";

describe("MaterialDesignIcon.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const wrapper = mount(MaterialDesignIcon, {
            localVue,
            propsData: {
                icon: mdiChevronUp
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <svg width="24" height="24" viewBox="0 0 24 24" class="">
              <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
            </svg>
        `);
    });

    it("renders spin", (): void => {
        const wrapper = mount(MaterialDesignIcon, {
            localVue,
            propsData: {
                spin: true,
                icon: mdiChevronUp
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <svg width="24" height="24" viewBox="0 0 24 24" class="mdi-spin">
              <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
            </svg>
        `);
    });

    it("renders non-default size", (): void => {
        const wrapper = mount(MaterialDesignIcon, {
            localVue,
            propsData: {
                size: 12,
                icon: mdiChevronUp
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <svg width="12" height="12" viewBox="0 0 24 24" class="">
              <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
            </svg>
        `);
    });
});
