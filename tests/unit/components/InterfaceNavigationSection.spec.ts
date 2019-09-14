import { createLocalVue, mount } from "@vue/test-utils";
import InterfaceNavigationSection from "../../../src/components/InterfaceNavigationSection.vue";
import VueCompositionApi from "@vue/composition-api";
import VueRouter from "vue-router";

describe("InterfaceNavigationSection.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueRouter);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(InterfaceNavigationSection, {
            localVue,
            propsData: {
                image: "https://via.placeholder.com/150",
                imageActive: "https://via.placeholder.com/150",
                title: "title",
                routes: []
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="nav-section">
              <div class="nav-section-header"><img alt="" src="https://via.placeholder.com/150"> <span class="nav-title">title</span> <svg width="24" height="24" viewBox="0 0 24 24" class="indicator" name="fade" mode="out-in">
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                </svg></div>
              <!---->
            </div>
        `);
    });
});
