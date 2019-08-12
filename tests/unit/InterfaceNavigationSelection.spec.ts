import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import InterfaceNavigationSection from "../../src/components/InterfaceNavigationSection.vue";
import contractImage from "../../src/assets/contract.svg";
import contractImageActive from "../../src/assets/contract-active.svg";
import VueRouter from "vue-router";

describe("InterfaceNavigationSection", () => {

    const routes = [
        {
            name: "deploy-contract",
            label: "Deploy Contract"
        }, {
            name: "interact-with-contract",
            label: "Interact with Contract"
        }
    ]
    const localVue = createLocalVue();
    localVue.use(VueRouter)
    const router = new VueRouter();
    const wrapper = mount(InterfaceNavigationSection, {
        localVue,
        router,
        propsData: {
            image: contractImage,
            "image-active": contractImageActive,
            title: "Contract",
            routes: routes
        },
    });

    it("renders", () => {
        expect(wrapper.find(".nav-title").text()).toMatch("Contract");
    });

    it("Accepts click inputs and shows links", () => {
        let img = wrapper.find("img").attributes("src")
        expect(img).toBe(wrapper.vm.$props.image)
        wrapper.find(".nav-section-header").trigger("click")
        expect(img).toBe(contractImageActive)

    })

});