import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/components/RadioButton.vue";
import imageKey from "@/assets/button-key.svg";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

describe("RadioButton.vue", () => {
    it("renders, contains expected properties", () => {
        const _name = "RadioGroup";
        const _label = "Label";
        const _value = "Value";

        const wrapper = shallowMount(RadioButton, {
            propsData: {
                name: _name,
                label: _label,
                value: _value,
                image: imageKey,
                checked: _value
            }
        });

        expect(wrapper.isVisible()).toBe(true);
        expect(wrapper.find("label").text()).toEqual(_label);
        expect(wrapper.find("input").attributes()["name"]).toEqual(_name);
        expect(wrapper.find("img").attributes()["src"]).toEqual(imageKey);
    });

    it("reacts when checked", () => {
        const _name = "RadioGroup";
        const _label = "Label";
        const _value = "Value";
        const fn = jest.fn();

        const wrapper = shallowMount(RadioButton, {
            propsData: {
                name: _name,
                label: _label,
                value: _value,
                image: imageKey,
                checked: _value
            },
            listeners: {
                change: fn
            }
        });

        wrapper.find("input").setChecked(true);
        expect(fn).toBeCalledTimes(1);
        expect(wrapper.emitted("change")[0][0]).toEqual(_value);
        expect(wrapper.find('label').classes()).toContain("is-selected");
        expect(wrapper.contains(FontAwesomeIcon)).toBe(true);  // green check
    });
});
