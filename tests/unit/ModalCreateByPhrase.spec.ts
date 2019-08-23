import { shallowMount, createLocalVue } from "@vue/test-utils";
import { plugin as VueFunctionApi } from "vue-function-api";
import ModalCreateByPhrase from "../components/ModalCreateByPhrase.vue";

describe("ModalCreateByPhrase.vue", (): void => {
    it("renders", (): void => {
        expect.assertions(2);
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

        expect(wrapper.find("modal-create-by-mnemonic-phrase")).not.toBeNull();
        expect(onChange).toHaveBeenCalledTimes(0);
    });
});
