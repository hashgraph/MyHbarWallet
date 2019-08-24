import { shallowMount, createLocalVue } from "@vue/test-utils";
import Notice from "../../src/components/Notice.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("Notice.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    it("renders", (): void => {
        expect.assertions(2);
        const wrapper = shallowMount(Notice, {
            localVue
        });

        expect(wrapper.isVisible()).toBe(true);
        expect(wrapper.find(".title").exists()).toBe(false);
    });
});
