import { shallowMount, createLocalVue } from "@vue/test-utils";
import { plugin as VueFunctionApi } from "vue-function-api";
import Alert from "../../src/components/Alert.vue";

describe("Alert", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    const wrapper = shallowMount(Alert, {
        localVue,
        propsData: {
            id: 1,
            message: "test",
            level: "info"
        }
    });

    it("renders", (): void => {
        expect.assertions(2);
        expect(wrapper.find("div").classes()).toContain("info");
        expect(wrapper.find(".message").text()).toContain("test");
    });

    it("dynamically changes message and style", (): void => {
        expect.assertions(2);
        wrapper.setProps({
            message: "test2",
            level: "success"
        });
        expect(wrapper.find("div").classes()).toContain("success");
        expect(wrapper.find(".message").text()).toContain("test2");
    });
});
