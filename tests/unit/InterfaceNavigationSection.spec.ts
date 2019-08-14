import { mount, createLocalVue } from "@vue/test-utils";
import InterfaceNavigationSection from "../../src/components/InterfaceNavigationSection.vue";
import contractImage from "../../src/assets/contract.svg";
import contractImageActive from "../../src/assets/contract-active.svg";
import router from "../../src/router";
import Router from "vue-router";

describe("InterfaceNavigationSection", (): void => {
    // Mock-out `window.scrollTo`
    Object.defineProperty(window, "scrollTo", { value: jest.fn() });

    const routes = [
        {
            name: "deploy-contract",
            label: "Deploy Contract"
        },
        {
            name: "interact-with-contract",
            label: "Interact with Contract"
        }
    ];

    const localVue = createLocalVue();
    localVue.use(Router);

    const wrapper = mount(InterfaceNavigationSection, {
        localVue,
        router,
        propsData: {
            image: contractImage,
            "image-active": contractImageActive,
            title: "Contract",
            routes
        }
    });

    it("renders", (): void => {
        expect.assertions(1);
        expect(wrapper.find(".nav-title").text()).toMatch("Contract");
    });

    it("accepts click inputs and shows links", (): void => {
        expect.assertions(2);
        const img = wrapper.find("img").attributes("src");
        expect(img).toBe(wrapper.vm.$props.image);
        wrapper.find(".nav-section-header").trigger("click");
        expect(img).toBe(contractImageActive);
    });
});
