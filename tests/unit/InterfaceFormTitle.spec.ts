import { shallowMount } from "@vue/test-utils";
import InterfaceFormTitle from "@/components/InterfaceFormTitle.vue";

describe("InterfaceForm.vue", (): void => {
    it("renders", (): void => {
        expect.assertions(1);
        const title =
            "Bacon ipsum dolor amet strip steak pork chop eu consequat pork belly excepteur.";
        const wrapper = shallowMount(InterfaceFormTitle, {
            propsData: {
                title
            }
        });

        expect(wrapper.text()).toBe(title);
    });
});
