import { createLocalVue, shallowMount } from "@vue/test-utils";
import InterfaceFormTitle from "../../src/components/InterfaceFormTitle.vue";
import VueCompositionApi from "@vue/composition-api";

describe("InterfaceForm.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);
        const title =
            "Bacon ipsum dolor amet strip steak pork chop eu consequat pork belly excepteur.";
        const wrapper = shallowMount(InterfaceFormTitle, {
            localVue,
            propsData: {
                title
            }
        });

        expect(wrapper.text()).toBe(title);
    });
});
