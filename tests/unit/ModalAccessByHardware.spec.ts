import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalAccessByHardware from "../../src/components/ModalAccessByHardware.vue";

describe("ModalAccessByHardware.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const onChange = jest.fn();
        const wrapper = shallowMount(ModalAccessByHardware, {
            localVue,
            propsData: {
                isOpen: false
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <modal-stub title="Access by hardware">
              <form class="modal-access-by-hardware">
                <radiobuttongroup-stub name="hardware-access-option" options="[object Object]" value=""></radiobuttongroup-stub>
                <button-stub label="Choose a Hardware" disabled="true" class="button-choose-a-hardware"></button-stub>
                <customersupportlink-stub></customersupportlink-stub>
              </form>
            </modal-stub>
        `);
    });
});
