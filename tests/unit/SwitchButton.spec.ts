import { createLocalVue, mount } from "@vue/test-utils";
import SwitchButton from "../../src/components/SwitchButton.vue";
import VueCompositionApi from "@vue/composition-api";

describe("SwitchButton.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders unchecked", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(SwitchButton, {
            localVue,
            propsData: {
                checked: false
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <label class="switch-button"><input type="checkbox" class="input"> <span class="thumb"></span>
              <!----></label>
        `);
    });

    it("renders checked", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(SwitchButton, {
            localVue,
            propsData: {
                checked: true
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <label class="switch-button"><input type="checkbox" class="input"> <span class="thumb"></span>
              <!----></label>
        `);
    });
});
