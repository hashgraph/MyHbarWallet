import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Accordion from "../../src/components/Accordion.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("Accordion.vue", (): void => {
    const title = "Title";
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    it("renders", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(Accordion, {
            localVue,
            slots: {
                title,
                content: "Content"
            }
        });
        expect(wrapper.find(".title-text").text()).toContain(title);
    });

    it("transitions to show content when clicked", (): void => {
        expect.assertions(3);
        const title = "Title";
        const content = "Content";

        const wrapper = mount(Accordion, {
            localVue,
            slots: {
                title,
                content
            }
        });

        expect(wrapper.find(".title-text").text()).toContain(title);
        expect(wrapper.find(".content").text()).toContain(content);

        wrapper.find(".title").trigger("click");
        expect(wrapper.classes()).toContain("expanded");
    });
});
