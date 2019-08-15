import { shallowMount } from "@vue/test-utils";
import CommunitySocialIcon from "@/components/CommunitySocialIcon.vue";
import Community from "@/components/Community.vue";

describe("Community.vue", (): void => {
    it("renders", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(Community);
        expect(wrapper.findAll(CommunitySocialIcon)).toHaveLength(5);
    });
});
