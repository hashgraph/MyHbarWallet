import { mount } from "@vue/test-utils";
import ReadOnlyInput from "../../../src/components/ReadOnlyInput.vue";
import i18n from "../../../src/i18n";

describe("ReadOnlyInput.vue", (): void => {
    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(ReadOnlyInput, {
            i18n,
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
