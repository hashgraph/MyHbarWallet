import { createLocalVue, shallowMount } from "@vue/test-utils";
import InterfaceFormTitle from "@/components/InterfaceFormTitle.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("InterfaceForm.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

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
