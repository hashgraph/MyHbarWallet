import { shallowMount } from "@vue/test-utils";
import Footer from "@/components/Footer.vue";

describe("Footer.vue", (): void => {
    it("renders and contains footer information", (): void => {
        const wrapper = shallowMount(Footer);
        const year = new Date().getFullYear();
        expect(wrapper.isVisible()).toBe(true);
        expect(wrapper.text().includes(year.toString())).toBe(true);
        expect(wrapper.text().includes("Terms")).toBe(true);
        expect(wrapper.text().includes("Privacy")).toBe(true);
    });
});
