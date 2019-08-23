import { shallowMount, createLocalVue } from "@vue/test-utils";
import Modal from "../../src/components/Modal.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("Modal.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    const wrapper = shallowMount(Modal, {
        localVue,
        propsData: {
            notClosable: false,
            title: "test text",
            isOpen: true
        }
    });

    it("renders", (): void => {
        expect.assertions(1);
        expect(wrapper.find("div").classes()).toContain("is-open");
    });

    it("closes", (): void => {
        expect.assertions(1);
        wrapper.setProps({
            isOpen: false
        });
        expect(wrapper.find("div").classes()).not.toContain("is-open");
    });
});
