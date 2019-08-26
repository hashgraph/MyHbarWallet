import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import InterfaceVerifyMessage from "../../src/views/InterfaceVerifyMessage.vue";
import VueCompositionApi from "@vue/composition-api";

describe("InterfaceVerifyMessage.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.hasAssertions();
        const wrapper = shallowMount(InterfaceVerifyMessage, {
            localVue
        });

        expect(wrapper.find(".verify-message")).not.toBeNull();
    });

    it("renders a disabled button when signature is empty", (): void => {
        expect.hasAssertions();
        const wrapper = mount(InterfaceVerifyMessage, {
            localVue
        });

        expect(wrapper.find("button").attributes()["disabled"]).not.toBeNull();
    });
});
