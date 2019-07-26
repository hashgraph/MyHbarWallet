import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders", () => {
    const name = "World";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { name }
    });

    expect(wrapper.text()).toMatch(`Hello, ${name}!`);
  });
});
