import { mount, createLocalVue } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalViewAccountId from "../../src/components/ModalViewAccountId.vue";
import Vuex from "vuex";
import store from "../../src/store";

describe("ModalViewAccountId.vue", (): void => {
    it("renders open", (): void => {
        expect.assertions(2);

        const localVue = createLocalVue();
        localVue.use(VueCompositionApi);
        localVue.use(Vuex);
        const localStore = new Vuex.Store(store);

        const onChange = jest.fn();

        const wrapper = mount(ModalViewAccountId, {
            localStore,
            localVue,
            propsData: {
                isOpen: true,
                event: "change"
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot();

        expect(onChange).toHaveBeenCalledTimes(0);
    });

    it("renders closed", (): void => {
        expect.assertions(2);

        const localVue = createLocalVue();
        localVue.use(VueCompositionApi);
        localVue.use(Vuex);
        const localStore = new Vuex.Store(store);

        const onChange = jest.fn();

        const wrapper = mount(ModalViewAccountId, {
            localStore,
            localVue,
            propsData: {
                isOpen: false,
                event: "change"
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot();

        expect(onChange).toHaveBeenCalledTimes(0);
    });
});
