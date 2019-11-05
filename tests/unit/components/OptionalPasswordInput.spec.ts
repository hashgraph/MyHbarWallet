import { mount } from "@vue/test-utils";
import OptionalPasswordInput from "../../../src/components/OptionalPasswordInput.vue";
import i18n from "../../../src/i18n";

describe("OptionalPasswordInput", (): void => {
    it("renders", (): void => {

        const wrapper = mount(OptionalPasswordInput, {
            propsData: {
                value: "",
                passwordWarning: null
            },
            i18n,
            listeners: {
                input: jest.fn()
            }
        });

        expect(wrapper).toMatchInlineSnapshot();
    });
});
