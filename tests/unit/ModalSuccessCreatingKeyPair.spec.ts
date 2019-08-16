import { shallowMount } from "@vue/test-utils";
import ModalSuccessCreatingKeyPair from "@/components/ModalSuccessCreatingKeyPair.vue";
import Modal from "@/components/Modal.vue";

describe("ModalSuccessCreatingKeyPair.vue", (): void => {
    it("renders", (): void => {
        expect.assertions(2);
        const wrapper = shallowMount(ModalSuccessCreatingKeyPair, {
            propsData: {
                isOpen: false
            }
        });

        expect(wrapper.find(Modal).props().isOpen).toBe(false);

        wrapper.setProps({ isOpen: true });
        expect(wrapper.find(Modal).props().isOpen).toBe(true);
    });

    it.todo("navigates");
});
