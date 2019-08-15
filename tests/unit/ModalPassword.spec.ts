import ModalPassword from "@/components/ModalPassword.vue";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("ModalPassword.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    it("renders", (): void => {
        expect.assertions(1);
        const state = { modalIsOpen: false, password: "", isBusy: false };
        const wrapper = shallowMount(ModalPassword, {
            localVue,
            propsData: {
                state
            }
        });

        expect(wrapper.find(".modal-password").isVisible()).toBe(true);
    });

    it("renders a disabled button when the password is empty", (): void => {
        expect.assertions(1);
        const state = { modalIsOpen: false, password: "", isBusy: false };
        const wrapper = mount(ModalPassword, {
            localVue,
            propsData: {
                state
            }
        });

        expect(wrapper.find("button").element.hasAttribute("disabled")).toBe(
            true
        );
    });

    it("renders an enabled button when the password is not empty", (): void => {
        expect.assertions(1);
        const state = {
            modalIsOpen: false,
            password: "nonempty",
            isBusy: false
        };

        const wrapper = mount(ModalPassword, {
            localVue,
            propsData: {
                state
            }
        });

        expect(wrapper.find("button").element.hasAttribute("disabled")).toBe(
            false
        );
    });
});
