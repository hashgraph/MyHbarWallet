import { shallowMount, createLocalVue } from "@vue/test-utils";
import { plugin as VueFunctionApi } from "vue-function-api";
import ModalCreateByPhrase from "@/components/ModalCreateByPhrase.vue";
import Modal from "@/components/Modal.vue";

describe("ModalCreateByPhrase.vue", (): void => {
    it("renders", (): void => {
        expect.assertions(3);
        const localVue = createLocalVue();
        localVue.use(VueFunctionApi);
        const onChange = jest.fn();
        const wrapper = shallowMount(ModalCreateByPhrase, {
            localVue,
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
