import { createLocalVue, mount } from "@vue/test-utils";
import RadioButton from "../../../src/components/RadioButton.vue";
import imageKey from "../../../src/assets/button-key.svg";
import VueCompositionApi from "@vue/composition-api";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("RadioButton.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    const name = "RadioGroup";
    const label = "Label";
    const value = "Value";

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(RadioButton, {
            localVue,
            i18n,
            propsData: {
                name,
                label,
                value,
                image: imageKey,
                checked: value
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <label for="Value" class="radio-button selected"><img alt="" src="" class="icon"> <input id="Value" type="radio" name="RadioGroup" class="input" value="Value"> <span class="label">Label</span> <svg width="24" height="24" viewBox="0 0 24 24" class="check">
                <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path>
              </svg></label>
        `);
    });

    it("reacts when checked", (): void => {
        expect.assertions(1);
        const fn = jest.fn();

        const wrapper = mount(RadioButton, {
            localVue,
            i18n,
            propsData: {
                name,
                label,
                value,
                image: imageKey,
                checked: value
            },
            listeners: { change: fn }
        });

        wrapper.find("input").setChecked(true);

        expect(wrapper).toMatchInlineSnapshot(`
            <label for="Value" class="radio-button selected"><img alt="" src="" class="icon"> <input id="Value" type="radio" name="RadioGroup" class="input" value="Value"> <span class="label">Label</span> <svg width="24" height="24" viewBox="0 0 24 24" class="check">
                <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path>
              </svg></label>
        `);
    });
});
