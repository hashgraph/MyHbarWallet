import {createLocalVue, shallowMount} from "@vue/test-utils";
import ModalEnterAccountId from "@/components/ModalEnterAccountId.vue";
import {plugin as VueFunctionApi} from "vue-function-api";

describe("ModalEnterAccountId.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    it("renders", (): void => {
        expect.assertions(1);
        const state = { modalIsOpen: false, isBusy: false, account: ""};
        const wrapper = shallowMount(ModalEnterAccountId, {
            localVue,
            propsData: {
                state
            }
        });

        expect(wrapper.find(".enter-account-id")).not.toBeNull();
    });
});
