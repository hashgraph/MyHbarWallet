import { shallowMount } from "@vue/test-utils";
import InterfaceForm from "@/components/InterfaceForm.vue";
import InterfaceFormTitle from "@/components/InterfaceFormTitle.vue";

describe("InterfaceForm.vue", () => {
    it("renders", () => {
        const title = "ABC123";
        const wrapper = shallowMount(InterfaceForm, {
            propsData: {
                title: title,
            }
        });

        expect(wrapper.find(InterfaceFormTitle).props().title).toBe(title);
    });
});
