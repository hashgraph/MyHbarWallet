import { mount } from "@vue/test-utils";
import InterfaceForm from "../../src/components/InterfaceForm.vue";

describe("InterfaceForm.vue", (): void => {
    it("renders", (): void => {
        expect.assertions(1);

        const title = "ABC123";

        const wrapper = mount(InterfaceForm, {
            propsData: {
                title
            },
            stubs: {
                InterfaceFormTitle: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="interface-form">
              <interfaceformtitle-stub title="ABC123"></interfaceformtitle-stub>
              <div class="interface-form-container">
                <div class="form-main"></div>
                <div class="form-footer"></div>
              </div>
            </div>
        `);
    });
});
