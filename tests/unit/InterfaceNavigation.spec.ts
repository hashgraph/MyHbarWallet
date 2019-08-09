// import { mount, shallowMount } from "@vue/test-utils";
// import InterfaceNavigationSection from "../../src/components/InterfaceNavigationSection.vue";
// import InterfaceNavigation from "../../src/components/InterfaceNavigation.vue";
// import contractImage from "../../src/assets/contract.svg";
// import contractImageActive from "../../src/assets/contract-active.svg";

// describe("InterfaceNavigation", () => {
//     const wrapper = shallowMount(InterfaceNavigation);
//     it("renders with children components", () => {
//         expect(wrapper.find(InterfaceNavigationSection).exists()).toBeTruthy();
//     })
// });

// describe("InterfaceNavigationSection", () => {
//     const routes = [
//             { 
//                 name: "deploy-contract", 
//                 label: "Deploy Contract"
//             },{
//                 name: "interact-with-contract",
//                 label: "Interact with Contract"
//             }
//         ]

//     const wrapper = shallowMount(InterfaceNavigationSection, {
//         propsData: {
//             image: contractImage,
//             "image-active": contractImageActive,
//             title: "Contract",
//             routes: routes as InterfaceNavigationItem;
//         },
//     });
//     it("renders", () => {
//         expect(wrapper.find(".nav-title")).toMatch("Contract");
//     });
// });