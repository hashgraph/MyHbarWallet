import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import TextInput from "../../src/components/TextInput.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("TextInput.vue", () => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    it("renders", (): void => {
        const value = "12345";
        const wrapper = shallowMount(TextInput, {
            localVue,
            propsData: { value }
        });

        const inputElement = wrapper.find("input").element as HTMLInputElement;

        expect(inputElement.getAttribute("type")).toBe("text");
        expect(inputElement.value).toBe(value);
    });

    it("renders a password securely (and allows to toggle visibility)", (): void => {
        const value = "super-secure-password";
        const wrapper = mount(TextInput, {
            localVue,
            propsData: { obscure: true, value }
        });

        let inputElement = wrapper.find("input").element as HTMLInputElement;
        expect(inputElement.getAttribute("type")).toBe("password");

        // Expose the password
        wrapper.find(".eye").trigger("click");

        inputElement = wrapper.find("input").element as HTMLInputElement;
        expect(inputElement.getAttribute("type")).toBe("text");
    });

    it("forwards input event from HTML input", (): void => {
        let value = "";

        const wrapper = shallowMount(TextInput, {
            localVue,
            propsData: { obscure: true, value },
            listeners: {
                input(newValue: string) {
                    value = newValue;
                }
            }
        });

        const newValue = "12345";

        // Trigger an INPUT event (user typing on keyboard)
        (wrapper.find("input").element as HTMLInputElement).value = newValue;
        wrapper.find("input").trigger("input");

        expect(value).toBe(newValue);
    });
});
