import { createLocalVue, mount } from "@vue/test-utils";
import Select from "../../src/components/Select.vue";
import VueCompositionApi from "@vue/composition-api";

describe("Select.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    const wrapper = mount(Select, {
        localVue,
        propsData: {
            selected: "current selected",
            options: ["1", "2", "3"]
        }
    });

    it("renders", (): void => {
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="select">
              <div class="select-value-container">
                <div class="select-value">current selected</div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                </svg>
              </div>
              <div class="select-menu">
                <div class="select-option">
                  1
                </div>
                <div class="select-option">
                  2
                </div>
                <div class="select-option">
                  3
                </div>
              </div>
            </div>
        `);
    });

    it("renders as opened after click", (): void => {
        wrapper.find(".select-value-container").trigger("click");

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="select is-open">
              <div class="select-value-container">
                <div class="select-value">current selected</div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                  <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
                </svg>
              </div>
              <div class="select-menu">
                <div class="select-option">
                  1
                </div>
                <div class="select-option">
                  2
                </div>
                <div class="select-option">
                  3
                </div>
              </div>
            </div>
        `);
    });
});
