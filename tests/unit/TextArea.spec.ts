import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import TextArea from "@/components/TextArea.vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("TextArea.vue", () => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    it("renders", () => {
        const placeholder = "placeholder text";
        const value = "textarea text";
        const wrapper = shallowMount(TextArea, {
            localVue,
            propsData: {
                placeholder,
                value
            }
        });

        const textAreaElement = wrapper.find("textarea")
            .element as HTMLTextAreaElement;

        expect(textAreaElement.getAttribute("placeholder")).toBe(placeholder);
        expect(textAreaElement.value).toBe(value);
    });

    it("renders label when it's not null", () => {
        const label = "label text";
        const wrapper = shallowMount(TextArea, {
            localVue,
            propsData: {
                label,
            }
        });

        expect(wrapper.contains(".label")).toBe(true);
        expect(wrapper.find(".label").text()).toBe(label);
    });

    it("renders validation indicator when showValidation is true", () => {
        const showValidation = true;
        const valid = true;
        const wrapper = mount(TextArea, {
            localVue,
            propsData: {
                showValidation,
                valid
            }
        });

        expect(wrapper.contains(MaterialDesignIcon)).toBe(true);
    });

    it("renders copy action when canCopy is true", () => {
        const copyText = "Copy";
        const canCopy = true;
        const wrapper = mount(TextArea, {
            localVue,
            propsData: {
                canCopy
            }
        });

        expect(
            wrapper.findAll(".action").filter(e => e.text() === copyText).length
        ).toEqual(1);
    });

    it("renders clear action when canClear is true", () => {
        const clearText = "Clear";
        const canClear = true;
        const wrapper = mount(TextArea, {
            localVue,
            propsData: {
                canClear
            }
        });

        expect(
            wrapper.findAll(".action").filter(e => e.text() === clearText)
                .length
        ).toEqual(1);
    });

    it("does not render validation indicator when showValidation is false", () => {
        const showValidation = false;
        const valid = true;
        const wrapper = mount(TextArea, {
            localVue,
            propsData: {
                showValidation,
                valid
            }
        });

        expect(wrapper.contains(MaterialDesignIcon)).toBe(false);
    });

    it("does not render copy action when canCopy is false", () => {
        const copyText = "Copy";
        const canCopy = false;
        const wrapper = mount(TextArea, {
            localVue,
            propsData: {
                canCopy
            }
        });

        expect(
            wrapper.findAll(".action").filter(e => e.text() === copyText).length
        ).toEqual(0);
    });

    it("does not render clear action when canClear is false", () => {
        const clearText = "Clear";
        const canClear = false;
        const wrapper = mount(TextArea, {
            localVue,
            propsData: {
                canClear
            }
        });

        expect(
            wrapper.findAll(".action").filter(e => e.text() === clearText)
                .length
        ).toEqual(0);
    });
});
