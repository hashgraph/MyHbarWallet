import ModalPassword from "../../src/components/ModalKeystoreFilePassword.vue";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";

describe("ModalKeystoreFilePassword.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);
        const state = {
            modalIsOpen: false,
            password: "",
            isBusy: false
        };
        const wrapper = shallowMount(ModalPassword, {
            localVue,
            propsData: {
                state
            }
        });

        expect(wrapper.find(".modal-password").isVisible()).toBe(true);
    });

    it("renders a disabled button when the password less than 9 characters", (): void => {
        expect.assertions(1);
        const state = {
            modalIsOpen: false,
            password: "",
            isBusy: false
        };
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

    it("renders an enabled button when the password is greater than 9 characters", (): void => {
        expect.assertions(1);
        const state = {
            modalIsOpen: false,
            password: "123456789",
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
