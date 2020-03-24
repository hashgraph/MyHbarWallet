import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";

import InterfaceNavigationSection from "../../../src/ui/components/InterfaceNavigationSection.vue";
import i18n from "../../../src/service/i18n";

describe("InterfaceNavigationSection.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueRouter);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(InterfaceNavigationSection, {
            localVue,
            i18n,
            propsData: {
                image: "https://via.placeholder.com/150",
                imageActive: "https://via.placeholder.com/150",
                title: "title",
                routes: [],
                icon: ""
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="nav-section" image="https://via.placeholder.com/150" imageactive="https://via.placeholder.com/150">
              <div class="nav-section-header"><svg width="24" height="24" viewBox="0 0 24 24" class="icon" alt="">
                  <path d=""></path>
                </svg> <span class="nav-title">title</span> <svg width="24" height="24" viewBox="0 0 24 24" class="indicator">
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                </svg></div>
              <!---->
            </div>
        `);
    });
});
