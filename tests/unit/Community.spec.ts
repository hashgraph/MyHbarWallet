import { shallowMount } from "@vue/test-utils";
import CommunitySocialIcon from "@/components/CommunitySocialIcon.vue";
import Community from "@/components/Community.vue";

describe("Community.vue", () => {
    it("renders", () => {
        const wrapper = shallowMount(Community);
        expect(wrapper.findAll(CommunitySocialIcon)).toHaveLength(5);
    });
});
