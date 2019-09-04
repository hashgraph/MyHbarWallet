import { createLocalVue, mount } from "@vue/test-utils";
import SwitchButton from "../../src/components/SwitchButton.vue";
import VueCompositionApi from "@vue/composition-api";

describe("SwitchButton.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const handler = jest.fn();
        const wrapper = mount(SwitchButton, {
            localVue,
            propsData: {
                checked: false
            },
            listeners: {
                change: handler
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <label class="switch-button"><input type="checkbox" class="input"> <span class="thumb"></span>
              <!----></label>
        `);
    });
});
