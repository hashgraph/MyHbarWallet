import { createLocalVue, mount } from "@vue/test-utils";
import Tooltip from "../../src/components/Tooltip.vue";
import VueCompositionApi from "@vue/composition-api";

describe("Tooltip.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const message = "Tooltip Text";
        const wrapper = mount(Tooltip, {
            localVue,
            propsData: {
                message,
                pinnable: true
            },
            slots: {
                default: "<div class='component'>Hover Me</div>"
            }
        });

        wrapper.find(".slot-container").trigger("click");

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="tooltip-container active">
              <div class="slot-container">
                <div class="component">Hover Me</div>
              </div>
              <div class="message">
                Tooltip Text
              </div>
            </div>
        `);
    });
});
