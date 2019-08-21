import { shallowMount } from "@vue/test-utils";
import ReadOnlyInput from "@/components/ReadOnlyInput.vue";

describe("ReadOnlyInput.vue", (): void => {
    it("renders", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(ReadOnlyInput, {
            propsData: {
                value: "test"
            }
        });

        expect(wrapper.find("read-only-input")).not.toBeNull();
    });
});
