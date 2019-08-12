import { shallowMount } from "@vue/test-utils";
import FAQs from "@/components/FAQs.vue";
import Accordion from "@/components/Accordion.vue";
import CustomerSupportLink from "@/components/CustomerSupportLink.vue";

describe("FAQs.vue", (): void => {
    it("renders", (): void => {
        const wrapper = shallowMount(FAQs);
        expect(wrapper.findAll(Accordion)).toHaveLength(4);
        expect(wrapper.findAll(CustomerSupportLink)).toHaveLength(1);
    });
});
