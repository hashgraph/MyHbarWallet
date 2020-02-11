import { createLocalVue, mount } from "@vue/test-utils";
import SwitchButton from "../../../src/components/SwitchButton.vue";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import i18n from "../../../src/i18n";

describe("SwitchButton.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders unchecked", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(SwitchButton, {
            localVue,
            i18n,
            propsData: { checked: false },
            listeners: { change: onChange }
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
            i18n,
            propsData: { checked: true },
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <label class="switch-button"><input type="checkbox" class="input"> <span class="thumb"></span>
              <!----></label>
        `);
    });
});
