import { shallowMount } from "@vue/test-utils";
import InterfaceVerifyMessage from "@/views/InterfaceVerifyMessage.vue";

describe("InterfaceVerifyMessage.vue", (): void => {
    it("renders", (): void => {
        const wrapper = shallowMount(InterfaceVerifyMessage);

        expect(wrapper.find(".verify-message")).toBeTruthy();
    });

    // it("renders a disabled button when signature is empty", (): void => {
    //     const wrapper = shallowMount(InterfaceVerifyMessage);
    //
    //     expect(wrapper.find("button").attributes()["disabled"]).toBeTruthy();
    // });
});
