import { mount, shallowMount } from "@vue/test-utils";
import Accordion from "@/components/Accordion.vue";

describe("Accordion.vue", () => {
    const title = "Title";

    it("renders", () => {
        const wrapper = shallowMount(Accordion, {
            slots: {
                title: title,
                content: "Content"
            }
        });
        expect(wrapper.find(".title-text").text()).toContain(title);
    });

    it("transitions to show content when clicked", () => {
        const title = "Title";
        const content = "Content";

        const wrapper = mount(Accordion, {
            slots: {
                title: title,
                content: content
            }
        });
        expect(wrapper.find(".title-text").text()).toContain(title);
        expect(wrapper.find(".content").text()).toContain(content);
        expect(wrapper.vm.$data.expanded).toBe(false);

        wrapper.find(".title").trigger("click");

        expect(wrapper.find(".content-text").text()).toContain(content);
        expect(wrapper.vm.$data.expanded).toBe(true);
    });
});
