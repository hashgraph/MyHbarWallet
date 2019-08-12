import { shallowMount } from "@vue/test-utils";
import ModalCreateByPhrase from "@/components/ModalCreateByPhrase.vue";
import Modal from "@/components/Modal.vue";

describe("ModalCreateByPhrase.vue", (): void => {
    it("renders", (): void => {
        const onChange = jest.fn();
        const wrapper = shallowMount(ModalCreateByPhrase, {
            propsData: {
                isOpen: false
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper.find(Modal).props().isOpen).toBe(false);

        wrapper.setProps({ isOpen: true });
        expect(wrapper.find(Modal).props().isOpen).toBe(true);

        expect(onChange).toHaveBeenCalledTimes(0);
    });
});
