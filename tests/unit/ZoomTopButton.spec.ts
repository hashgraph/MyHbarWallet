import { shallowMount, createLocalVue } from "@vue/test-utils";
import ZoomTopButton from "../../src/components/ZoomTopButton.vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import "../../src/directives"

describe(ZoomTopButton, () => {

    it("isn't active at first", async () => {
        const wrapper = shallowMount(ZoomTopButton);
        const zButton = wrapper.find('button');

        expect(zButton.classes()).not.toEqual(expect.arrayContaining(['is-active']));
    });
    
    it("appears after 150px scrolling in the Y direction", () => {
        const wrapper = shallowMount(ZoomTopButton);
        const zButton = wrapper.find('button');

        wrapper.setData({ isActive: true });

        expect(zButton.classes()).toEqual(expect.arrayContaining(['is-active']));
    });

    it("renders an up arrow", () => {
        const wrapper = shallowMount(ZoomTopButton);

        expect(wrapper.contains(MaterialDesignIcon)).toBe(true);
    });

    it("triggers a click handler when clicked", () => {       
        const wrapper = shallowMount(ZoomTopButton);
        const handleClickMock = jest.fn();

        wrapper.setMethods( { handleClick: handleClickMock});
        wrapper.find('button').trigger("click");

        expect(handleClickMock).toBeCalledTimes(1);
    });
});
