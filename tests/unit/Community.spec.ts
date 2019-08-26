import { shallowMount, createLocalVue } from "@vue/test-utils";
import CommunitySocialIcon from "../../src/components/CommunitySocialIcon.vue";
import Community from "../../src/components/Community.vue";
import VueCompositionApi from "@vue/composition-api";

describe("Community.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    it("renders", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(Community, {
            localVue
        });
        expect(wrapper.findAll(CommunitySocialIcon)).toHaveLength(5);
    });
});
