import { shallowMount, createLocalVue } from "@vue/test-utils";
import InterfaceDeployContract from "../../src/views/InterfaceDeployContract.vue";
import { plugin as VueFunctionApi } from "vue-function-api";
import TextInput from "../../src/components/TextInput.vue";

describe("InterfaceDeployContract", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    const wrapper = shallowMount(InterfaceDeployContract, {localVue})
    it("renders", (): void => {
        expect(wrapper.findAll(TextInput)).toHaveLength(3)
    });
});