import ModalPassword from "@/components/ModalPassword.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("ModalPassword.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    it("renders", (): void => {
        const state = { modalIsOpen: false, password: "", isBusy: false };
        const wrapper = shallowMount(ModalPassword, {
            localVue,
            propsData: {
                state
            }
        });

        expect(wrapper.find(".modal-password")).toBeTruthy();
    });

    it("renders a disabled button when the password is empty", (): void => {
        const state = { modalIsOpen: false, password: "", isBusy: false };
        const wrapper = shallowMount(ModalPassword, {
            localVue,
            propsData: {
                state
            }
        });

        expect(wrapper.find(".btn").attributes()["disabled"]).toBeTruthy();
    });

    it("renders an enabled button when the password is not empty", (): void => {
        const state = {
            modalIsOpen: false,
            password: "nonempty",
            isBusy: false
        };
        const wrapper = shallowMount(ModalPassword, {
            localVue,
            propsData: {
                state
            }
        });

        expect(wrapper.find(".btn").attributes()["disabled"]).toBeFalsy();
    });
});
