import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/components/RadioButton.vue";
import imageKey from "@/assets/button-key.svg";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";

describe("RadioButton.vue", () => {
    it("renders, contains expected properties", () => {
        const name = "RadioGroup";
        const label = "Label";
        const value = "Value";

        const wrapper = shallowMount(RadioButton, {
            propsData: {
                name: name,
                label: label,
                value: value,
                image: imageKey,
                checked: value
            }
        });

        expect(wrapper.isVisible()).toBe(true);
        expect(wrapper.find("label").text()).toEqual(label);
        expect(wrapper.find("input").attributes()["name"]).toEqual(name);
        expect(wrapper.find("img").attributes()["src"]).toEqual(imageKey);
    });

    it("reacts when checked", () => {
        const name = "RadioGroup";
        const label = "Label";
        const value = "Value";
        const fn = jest.fn();

        const wrapper = shallowMount(RadioButton, {
            propsData: {
                name: name,
                label: label,
                value: value,
                image: imageKey,
                checked: value
            },
            listeners: {
                change: fn
            }
        });

        wrapper.find("input").setChecked(true);
        expect(fn).toBeCalledTimes(1);
        expect(wrapper.emitted("change")[0][0]).toEqual(value);
        expect(wrapper.find("label").classes()).toContain("is-selected");
        expect(wrapper.contains(MaterialDesignIcon)).toBe(true); // green check
    });
});
