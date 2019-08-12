import { shallowMount, createLocalVue } from "@vue/test-utils";
import Modal from "../../src/components/Modal.vue";

describe("Modal.vue", (): void => {
    const localVue = createLocalVue();
    const wrapper = shallowMount(Modal, {
        localVue,
        propsData: {
            notClosable: false,
            title: "test text",
            isOpen: true
        }
    });

    it("renders", (): void => {
        expect(wrapper.find("div").classes()).toContain("is-open");
    });

    it("closes", (): void => {
        wrapper.setProps({ isOpen: false });
        expect(wrapper.find("div").classes()).not.toContain("is-open");
    });
});
