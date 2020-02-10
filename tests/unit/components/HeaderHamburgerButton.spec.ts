import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import HeaderHamburgerButton from "../../../src/components/HeaderHamburgerButton.vue";
import i18n from "../../../src/i18n";

describe("HeaderHamburgerButton.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(HeaderHamburgerButton, {
            localVue,
            i18n,
            propsData: { isOpen: false }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="button-wrapper">
              <div class="bar-1"><svg height="24" width="24" viewBox="0 0 24 24" class="icon">
                  <path d="M19,13H5V11H19V13Z"></path>
                </svg></div>
              <div class="bar-2"><svg height="24" width="24" viewBox="0 0 24 24" class="icon">
                  <path d="M19,13H5V11H19V13Z"></path>
                </svg></div>
              <div class="bar-3"><svg height="24" width="24" viewBox="0 0 24 24" class="icon">
                  <path d="M19,13H5V11H19V13Z"></path>
                </svg></div>
            </div>
        `);
    });
});
