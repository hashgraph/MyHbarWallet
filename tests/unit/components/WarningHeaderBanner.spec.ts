import { createLocalVue, mount } from "@vue/test-utils";
import WarningHeaderBanner from "../../../src/components/WarningHeaderBanner.vue";
import VueCompositionApi from "@vue/composition-api";

describe("WarningHeaderBanner.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const wrapper = mount(WarningHeaderBanner, {
            localVue,
            propsData: {
                message: "This is a test of the warning banner"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="warning-banner-container">
              <div class="warning-text">
                This is a test of the warning banner
              </div>
              <div class="dismiss-button">
                Dismiss
              </div>
            </div>
        `);
    });
});
