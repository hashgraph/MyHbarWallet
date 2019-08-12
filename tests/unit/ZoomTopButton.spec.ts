import { createLocalVue, shallowMount } from "@vue/test-utils";
import ZoomTopButton from "../../src/components/ZoomTopButton.vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import "../../src/directives";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("ZoomTopButton", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    it("isn't active at first", (): void => {
        const wrapper = shallowMount(ZoomTopButton, { localVue });
        const zButton = wrapper.find("button");

        expect(zButton.classes()).not.toEqual(
            expect.arrayContaining(["is-active"])
        );
    });

    it("appears after 150px scrolling in the Y direction", (): void => {
        const wrapper = shallowMount(ZoomTopButton, { localVue });
        const zButton = wrapper.find("button");

        wrapper.setData({ isActive: true });

        expect(zButton.classes()).toEqual(
            expect.arrayContaining(["is-active"])
        );
    });

    it("renders an up arrow", (): void => {
        const wrapper = shallowMount(ZoomTopButton, { localVue });

        expect(wrapper.contains(MaterialDesignIcon)).toBe(true);
    });

    it("triggers a click handler when clicked", (): void => {
        const clickHandler = jest.fn();
        Object.defineProperty(window, "scrollTo", { value: clickHandler });

        const wrapper = shallowMount(ZoomTopButton, {
            localVue
        });

        wrapper.find("button").trigger("click");

        expect(clickHandler).toBeCalledTimes(1);
    });
});
