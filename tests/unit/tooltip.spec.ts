import { mount } from "@vue/test-utils";
import Tooltip from "@/components/Tooltip.vue";

describe("Tooltip.vue", () => {
    it("renders", () => {
        const wrapper = mount(Tooltip, {
            propsData: {
                message: "Tooltip Text",
                pinnable: true
            },
            slots: {
                default: "<div class='component'>Hover Me</div>"
            }
        });

        expect(wrapper.find(".message").exists()).toBe(true);
        expect(wrapper.find(".component").exists()).toBe(true);
        expect(wrapper.find(".tooltip-container").exists()).toBe(true);

        expect(wrapper.vm.$data.hovered).toBe(false);
        expect(wrapper.vm.$data.pinned).toBe(false);

        wrapper.find(".slot-container").trigger("click");

        expect(wrapper.vm.$data.hovered).toBe(false);
        expect(wrapper.vm.$data.pinned).toBe(true);
        expect(wrapper.find(".message").isVisible()).toBe(true);
    });
});
