import { shallowMount, createLocalVue } from "@vue/test-utils";
import CommunitySocialIcon from "@/components/CommunitySocialIcon.vue";
import Community from "@/components/Community.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("Community.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);
    it("renders", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(Community, { localVue });
        expect(wrapper.findAll(CommunitySocialIcon)).toHaveLength(5);
    });
});
