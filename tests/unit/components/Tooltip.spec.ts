import { createLocalVue, mount } from "@vue/test-utils";
import Tooltip from "../../../src/components/Tooltip.vue";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import i18n from "../../../src/i18n";

describe("Tooltip.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders, pinnable", (): void => {
        expect.assertions(1);

        const message = "Tooltip Text";
        const wrapper = mount(Tooltip, {
            localVue,
            i18n,
            propsData: {
                message,
                pinnable: true
            },
            slots: {
                default: "<div class='component'>Hover Me</div>"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="tooltip-container">
              <div class="slot-container">
                <div class="component">Hover Me</div>
              </div>
              <div class="message">
                Tooltip Text
              </div>
            </div>
        `);
    });

    it("renders unpinnable", (): void => {
        expect.assertions(1);

        const message = "Tooltip Text";
        const wrapper = mount(Tooltip, {
            localVue,
            i18n,
            propsData: {
                message,
                pinnable: false
            },
            slots: {
                default: "<div class='component'>Hover Me</div>"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="tooltip-container">
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
