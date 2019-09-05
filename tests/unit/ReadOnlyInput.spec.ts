import { mount } from "@vue/test-utils";
import ReadOnlyInput from "../../src/components/ReadOnlyInput.vue";

describe("ReadOnlyInput.vue", (): void => {
    it("renders", (): void => {
        const wrapper = mount(ReadOnlyInput, {
            propsData: {
                value: "test"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="read-only-input">
              <div class="value">test</div>
            </div>
        `);
    });
});
