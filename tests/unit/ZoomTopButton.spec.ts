import { createLocalVue, shallowMount } from "@vue/test-utils";
import ZoomTopButton from "../../src/components/ZoomTopButton.vue";
import MaterialDesignIcon from "../../src/components/MaterialDesignIcon.vue";
import "../../src/directives";
import VueCompositionApi from "@vue/composition-api";

describe("ZoomTopButton", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("isn't active at first", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(ZoomTopButton, {
            localVue
        });
        const zButton = wrapper.find("button");

        expect(zButton.classes()).not.toStrictEqual(
            expect.arrayContaining(["is-active"])
        );
    });

    it("appears after 150px scrolling in the Y direction", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(ZoomTopButton, {
            localVue
        });
        const zButton = wrapper.find("button");

        wrapper.setData({
            isActive: true
        });

        expect(zButton.classes()).toStrictEqual(
            expect.arrayContaining(["is-active"])
        );
    });

    it("renders an up arrow", (): void => {
        expect.assertions(1);
        const wrapper = shallowMount(ZoomTopButton, {
            localVue
        });

        expect(wrapper.contains(MaterialDesignIcon)).toBe(true);
    });

    it("triggers a click handler when clicked", (): void => {
        expect.assertions(1);
        const clickHandler = jest.fn();
        Object.defineProperty(window, "scrollTo", {
            value: clickHandler
        });

        const wrapper = shallowMount(ZoomTopButton, {
            localVue
        });

        wrapper.find("button").trigger("click");

        expect(clickHandler).toHaveBeenCalledTimes(1);
    });
});
