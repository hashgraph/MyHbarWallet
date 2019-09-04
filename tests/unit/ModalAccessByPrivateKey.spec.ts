import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalAccessByPrivateKey from "../../src/components/ModalAccessByPrivateKey.vue";

describe("ModalAccessByPrivateKey.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const onChange = jest.fn();
        const wrapper = shallowMount(ModalAccessByPrivateKey, {
            localVue,
            propsData: {
                state: {
                    modalIsOpen: false,
                    rawPrivateKey: "raw_private_key",
                    isBusy: false
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <modal-stub title="Access by Private Key">
              <form class="modal-access-by-private-key">
                <textinput-stub placeholder="Enter Private Key" value="raw_private_key" error=""></textinput-stub>
                <button-stub label="Access Account" disabled="true" class="button-access-wallet"></button-stub>
                <customersupportlink-stub></customersupportlink-stub>
              </form>
            </modal-stub>
        `);
    });
});
