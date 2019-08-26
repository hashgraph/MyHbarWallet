import { mount, createLocalVue } from "@vue/test-utils";
import Select from "../../src/components/Select.vue";
import VueCompositionApi from "@vue/composition-api";

describe("Select.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    const wrapper = mount(Select, {
        localVue,
        propsData: {
            selected: "current selected",
            options: ["1", "2", "3"]
        }
    });

    it("renders", (): void => {
        expect.assertions(1);
        expect(wrapper.findAll(".select-option")).toHaveLength(3);
    });

    it("opens on click", (): void => {
        expect.assertions(1);
        const select = wrapper.find(".select-value-container");
        select.trigger("click");
        expect(wrapper.find(".select").classes()).toContain("is-open");
    });
});
