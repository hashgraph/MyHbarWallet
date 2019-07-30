import { shallowMount } from "@vue/test-utils";
import Footer from "@/components/Footer.vue";

describe("Footer.vue", () => {
    it("renders and contains footer information", () => {
        const wrapper = shallowMount(Footer);
        expect(wrapper.isVisible());
        expect(wrapper.text().includes("Copyright"));
        expect(wrapper.text().includes("About"));
        expect(wrapper.text().includes("Contact"));
        expect(wrapper.text().includes("Terms & Conditions"));
        expect(wrapper.text().includes("Privacy Policy"));
    });
});
