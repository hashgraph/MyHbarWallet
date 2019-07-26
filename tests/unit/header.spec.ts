import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

describe("Header.vue", () => {
    it("renders", () => {
        const wrapper = shallowMount(Header);

        expect(wrapper.text().match("MHW  Home About FAQs"));
    });
});
