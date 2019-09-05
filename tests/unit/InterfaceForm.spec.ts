import { mount } from "@vue/test-utils";
import InterfaceForm from "../../src/components/InterfaceForm.vue";

describe("InterfaceForm.vue", (): void => {
    it("renders", (): void => {
        const title = "ABC123";
        const wrapper = mount(InterfaceForm, {
            propsData: {
                title
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="interface-form">
              <div class="interface-form-title-container">
                <div class="interface-form-title">ABC123</div> <button type="submit" class=""><span>Menu</span>
                  <!----></button>
              </div>
              <div class="interface-form-container">
                <div class="form-main"></div>
                <div class="form-footer"></div>
              </div>
            </div>
        `);
    });
});
