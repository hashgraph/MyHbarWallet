import { shallowMount } from "@vue/test-utils";
import InterFaceDeployContract from "../../src/views/InterfaceDeployContract.vue";
import TextInput from "../../src/components/TextInput.vue";
import Button from "../../src/components/Button.vue";

describe("InterFaceDeployContract", (): void => {
    it("renders", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(InterFaceDeployContract, {
            components: {
                TextInput
            }
        });

        expect(wrapper.findAll(TextInput)).toHaveLength(3);
    });
    it("disables button without propper input", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(InterFaceDeployContract, {
            components: {
                TextInput
            }
        });
        expect(wrapper.find(Button).exists()).toBe(false);
    });
});
