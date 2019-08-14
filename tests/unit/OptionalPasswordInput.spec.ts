import { shallowMount } from "@vue/test-utils";
import OptionalPasswordInput from "../../src/components/OptionalPasswordInput.vue";
import TextInput from "../../src/components/TextInput.vue";
describe("OptionalPasswordInput", (): void => {
    const wrapper = shallowMount(OptionalPasswordInput, {
        propsData: {
            value: ""
        },
        data: {
            showPassword: true
        }
    });

    it("renders", (): void => {
        expect.assertions(1);
        expect(wrapper.find(TextInput).text()).toContain("");
    });
});
