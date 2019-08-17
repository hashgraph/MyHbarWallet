// import { createLocalVue, shallowMount } from "@vue/test-utils";
// import HeaderHamburgerMenu from "../../src/components/HeaderHamburgerMenu.vue";
// import HeaderHamburgerButton from "../../src/components/HeaderHamburgerButton.vue";
// import { plugin as VueFunctionApi } from "vue-function-api";

// describe("HeaderHamburgerMenu.vue", (): void => {
//     const localVue = createLocalVue();
//     localVue.use(VueFunctionApi);

//     const wrapper = shallowMount(HeaderHamburgerMenu, {
//         localVue
//     });

//     it("renders", (): void => {
//         expect.assertions(1);

//         expect(wrapper.isVisible()).toBe(true);
//     });

//     it("opens", (): void => {
//         expect.assertions(2);

//         expect(wrapper.find("nav").classes()).not.toContain("nav-open");
//         wrapper.setProps({ isOpen: true });
//         expect(wrapper.find("nav").classes()).toContain("nav-open");
//     });
// });

// describe("HeaderHamburgerButton.vue", (): void => {
//     const localVue = createLocalVue();
//     localVue.use(VueFunctionApi);

//     const wrapper = shallowMount(HeaderHamburgerButton, {
//         localVue,
//         propsData: {
//             isOpen: false
//         }
//     });

//     it("renders", (): void => {
//         expect.assertions(1);
//         expect(wrapper.isVisible()).toBe(true);
//     });

//     it("triggers", (): void => {
//         expect.assertions(1);
//         wrapper.find(".button-wrapper").trigger("click");
//         expect(wrapper.emitted().toggle).toStrictEqual([[true]]);
//     });
// });
