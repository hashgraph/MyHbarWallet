import { createLocalVue, shallowMount } from "@vue/test-utils";
import ModalEnterAccountId from "../../src/components/ModalEnterAccountId.vue";
import VueCompositionApi from "@vue/composition-api";

describe("ModalEnterAccountId.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);
        const state = {
            modalIsOpen: false,
            isBusy: false,
            account: ""
        };
        const wrapper = shallowMount(ModalEnterAccountId, {
            localVue,
            propsData: {
                state
            }
        });

        expect(wrapper.find(".enter-account-id")).not.toBeNull();
    });
});
