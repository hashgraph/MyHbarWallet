import { shallowMount } from "@vue/test-utils";
import AccessMyAccount from "../../src/views/AccessMyAccount.vue";
import ModalAccessByHardware from "../../src/components/ModalAccessByHardware.vue";
import ModalAccessBySoftware from "../../src/components/ModalAccessBySoftware.vue";
import ModalAccessByPhrase from "../../src/components/ModalAccessByPhrase.vue";
import ModalAccessByPrivateKey from "../../src/components/ModalAccessByPrivateKey.vue";
import FAQs from "../../src/components/FAQs.vue";
describe("AccessMyAccount", (): void => {
    it("renders", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(AccessMyAccount, {
            components: {
                ModalAccessByHardware,
                ModalAccessBySoftware,
                ModalAccessByPhrase,
                ModalAccessByPrivateKey,
                FAQs
            }
        });
        const mainDiv = wrapper.find(".access-my-account");
        expect(mainDiv.exists()).toBe(true);
    });
});
