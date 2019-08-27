import { shallowMount, createLocalVue } from "@vue/test-utils";
import InterFaceDeployContract from "../../src/views/InterfaceDeployContract.vue";
import TextInput from "../../src/components/TextInput.vue";
import Button from "../../src/components/Button.vue";
import VueCompositionApi from "@vue/composition-api";

describe("InterFaceDeployContract", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(InterFaceDeployContract, {
            localVue,
            components: {
                TextInput
            }
        });

        expect(wrapper.findAll(TextInput)).toHaveLength(3);
    });

    it("disables button without proper input", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(InterFaceDeployContract, {
            localVue,
            components: {
                TextInput
            }
        });

        expect(wrapper.find(Button).exists()).toBe(false);
    });
});
