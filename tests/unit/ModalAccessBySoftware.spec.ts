import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalAccessBySoftware from "../../src/components/ModalAccessBySoftware.vue";

describe("ModalAccessBySoftware.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const onChange = jest.fn();
        const wrapper = shallowMount(ModalAccessBySoftware, {
            localVue,
            propsData: {
                isOpen: false
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <modal-stub title="Access by Software">
              <form class="modal-access-by-software">
                <radiobuttongroup-stub name="software-access-option" options="[object Object],[object Object],[object Object]"></radiobuttongroup-stub>
                <div class="hardware-link">
                  <div>
                    Purchase a hardware wallet for the highest security when
                    accessing your crypto.
                  </div>
                  <router-link to="[object Object]">
                    Purchase a hardware wallet....
                  </router-link>
                </div>
                <button-stub label="Continue" disabled="true"></button-stub>
                <customersupportlink-stub class="support-link"></customersupportlink-stub>
              </form>
            </modal-stub>
        `);
    });
});
