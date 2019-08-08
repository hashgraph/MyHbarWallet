import { createLocalVue, shallowMount } from "@vue/test-utils";
import { plugin as VueFunctionApi } from "vue-function-api";
import SendTransfer from "../../src/components/SendTransfer.vue";

describe("TextInput.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    it("renders", (): void => {
        const wrapper = shallowMount(SendTransfer, { localVue });

        expect(wrapper.isVisible()).toBe(true);
    });
});
