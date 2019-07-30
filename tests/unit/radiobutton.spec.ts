import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/components/RadioButton.vue";
import imageKey from "@/assets/button-key.svg";


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
                image: imageKey
            }
        });

        expect(wrapper.isVisible()).toBe(true);
        expect(wrapper.find('label').text()).toEqual(_label);
        expect(wrapper.find('input').attributes()['name']).toEqual(_name);
    });

    it("triggers a click, emits its value", () => {
        const _name = "RadioGroup";
        const _label = "Label";
        const _value = "Value";
        const fn = jest.fn();

        const wrapper = shallowMount(RadioButton, {
            propsData: {
                name: _name,
                label: _label,
                value: _value,
                image: imageKey
            },
            listeners: {
                click: fn
            }
        });

        wrapper.find('input').trigger("click");
        expect(fn).toBeCalledTimes(1);
        expect(wrapper.emitted("change")[0][0]).toEqual(_value);
    });

    it("changes state in response to click", () => {
        const _name = "RadioGroup";
        const _label = "Label";
        const _value = "Value";
        const fn = jest.fn();

        const wrapper = shallowMount(RadioButton, {
            propsData: {
                name: _name,
                label: _label,
                value: _value,
                image: imageKey
            },
            listeners: {
                click: fn
            }
        });

        const radio = wrapper.find("input[type='radio']");

        // You need both of the below to click and check the input
        radio.setChecked(true);
        radio.trigger("change");

        expect(wrapper.find('radio-button').classes()).toContain("is-selected");
    })
});
