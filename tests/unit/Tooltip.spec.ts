import { shallowMount, createLocalVue } from "@vue/test-utils";
import Tooltip from "@/components/Tooltip.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("Tooltip.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    it("opens tooltip on click for pinnable", (): void => {
        expect.assertions(3);
        const message = "Tooltip Text";
        const wrapper = shallowMount(Tooltip, {
            localVue,
            propsData: {
                message,
                pinnable: true
            },
            slots: {
                default: "<div class='component'>Hover Me</div>"
            }
        });

        expect(wrapper.classes()).not.toContain("active");

        wrapper.find(".slot-container").trigger("click");

        expect(wrapper.classes()).toContain("active");
        expect(wrapper.find(".message").text()).toMatch(message);
    });

    it("does not open tooltip on click for unpinnable", (): void => {
        expect.assertions(2);
        const wrapper = shallowMount(Tooltip, {
            localVue,
            propsData: {
                message: "",
                pinnable: false
            },
            slots: {
                default: "<div class='component'>Hover Me</div>"
            }
        });

        expect(wrapper.classes()).not.toContain("active");

        wrapper.find(".slot-container").trigger("click");

        expect(wrapper.classes()).not.toContain("active");
    });

    it("does open tooltip on mouseenter and close on mouseleave", (): void => {
        expect.assertions(3);
        const wrapper = shallowMount(Tooltip, {
            localVue,
            propsData: {
                message: "",
                pinnable: false
            },
            slots: {
                default: "<div class='component'>Hover Me</div>"
            }
        });

        expect(wrapper.classes()).not.toContain("active");

        wrapper.find(".slot-container").trigger("mouseenter");

        expect(wrapper.classes()).toContain("active");

        wrapper.find(".slot-container").trigger("mouseleave");

        expect(wrapper.classes()).not.toContain("active");
    });
});
