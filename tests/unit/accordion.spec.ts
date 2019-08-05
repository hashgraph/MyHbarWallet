import { mount, shallowMount } from "@vue/test-utils";
import Accordion from "@/components/Accordion.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

describe("Accordion.vue", () => {
    const title = "Title";

    it ("renders", () => {
        const wrapper = shallowMount(Accordion, {
            slots: {
                title: title,
                content: "Content"
            }
        });
        expect(wrapper.find('.title-text').text()).toContain(title);
        expect(wrapper.findAll(FontAwesomeIcon)).toHaveLength(1);
    });

    it ("transitions to show content when clicked", () => {
        const title = "Title";
        const content = "Content";

        const wrapper = mount(Accordion, {
            slots: {
                title: title,
                content: content
            }
        });
        expect(wrapper.find('.title-text').text()).toContain(title);
        expect(wrapper.find(FontAwesomeIcon).html()).toContain('fa-chevron-circle-up');
        expect(wrapper.find('.content').element).toBe(undefined);
        expect(wrapper.vm.$data.expanded).toBe(false);

        wrapper.find('.title').trigger("click");

        expect(wrapper.find(FontAwesomeIcon).html()).toContain('fa-chevron-circle-down');
        expect(wrapper.find('.content-text').text()).toContain(content);
        expect(wrapper.vm.$data.expanded).toBe(true);
    });
});
