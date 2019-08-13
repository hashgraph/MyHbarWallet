import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import InterfaceVerifyMessage from "@/views/InterfaceVerifyMessage.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("InterfaceVerifyMessage.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    it("renders", (): void => {
        expect.hasAssertions();
        const wrapper = shallowMount(InterfaceVerifyMessage, { localVue });

        expect(wrapper.find(".verify-message")).not.toBeNull();
    });

    it("renders a disabled button when signature is empty", (): void => {
        expect.hasAssertions();
        const wrapper = mount(InterfaceVerifyMessage, { localVue });

        expect(wrapper.find("button").attributes()["disabled"]).not.toBeNull();
    });
});
