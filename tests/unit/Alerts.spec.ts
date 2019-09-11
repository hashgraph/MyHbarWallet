import { createLocalVue, mount } from "@vue/test-utils";
import Alerts from "../../src/components/Alerts.vue";
import VueCompositionApi from "@vue/composition-api";

describe("Alerts.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(Alerts, {
            localVue
        });

        expect(wrapper).toMatchInlineSnapshot(
            `<span name="list" tag="div" class="alerts"></span>`
        );
    });
});
