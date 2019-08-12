import { mount, createLocalVue } from "@vue/test-utils";
import Select from "../../src/components/Select.vue";
import { plugin as VueFunctionApi } from "vue-function-api";

describe("Select.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);
    const wrapper = mount(Select, {
        localVue,
        propsData: {
            selected: "current selected",
            options: ["1","2","3"]
        }
    });

    it("renders", (): void => {
        expect(wrapper.findAll(".select-option")).toHaveLength(3)
    })

    it("opens on click", (): void => {
        const select = wrapper.find(".select-value-container");
        select.trigger("click")
        expect(wrapper.find(".select").classes()).toContain("is-open")
        
    });
});