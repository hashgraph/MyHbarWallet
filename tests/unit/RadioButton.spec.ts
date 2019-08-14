import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/components/RadioButton.vue";
import imageKey from "@/assets/button-key.svg";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";

describe("RadioButton.vue", (): void => {
    it("renders, contains expected properties", (): void => {
        expect.assertions(4);
        const name = "RadioGroup";
        const label = "Label";
        const value = "Value";

        const wrapper = shallowMount(RadioButton, {
            propsData: {
                name,
                label,
                value,
                image: imageKey,
                checked: value
            }
        });

        expect(wrapper.isVisible()).toBe(true);
        expect(wrapper.find("label").text()).toStrictEqual(label);
        expect(wrapper.find("input").attributes()["name"]).toStrictEqual(name);
        expect(wrapper.find("img").attributes()["src"]).toStrictEqual(imageKey);
    });

    it("reacts when checked", (): void => {
        expect.assertions(4);
        const name = "RadioGroup";
        const label = "Label";
        const value = "Value";
        const fn = jest.fn();

        const wrapper = shallowMount(RadioButton, {
            propsData: {
                name,
                label,
                value,
                image: imageKey,
                checked: value
            },
            listeners: {
                change: fn
            }
        });

        wrapper.find("input").setChecked(true);
        expect(fn).toHaveBeenCalledTimes(1);
        expect(wrapper.emitted("change")[0][0]).toStrictEqual(value);
        expect(wrapper.find("label").classes()).toContain("selected");
        expect(wrapper.contains(MaterialDesignIcon)).toBe(true); // green check
    });
});
