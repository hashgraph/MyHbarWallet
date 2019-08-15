import { shallowMount } from "@vue/test-utils";
import AccessMyAccount from "../../src/views/AccessMyAccount.vue";

describe("AccessMyAccount", (): void => {
    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(AccessMyAccount);
        const mainDiv = wrapper.find(".access-my-account");

        expect(mainDiv.exists()).toBe(true);
    });
});
