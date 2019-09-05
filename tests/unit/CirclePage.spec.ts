import { createLocalVue, mount } from "@vue/test-utils";
import CirclePage from "../../src/components/CirclePage.vue";
import VueCompositionApi from "@vue/composition-api";

describe("CirclePage.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    it("renders", (): void => {
        const wrapper = mount(CirclePage, {
            localVue
        });
        expect(wrapper).toMatchInlineSnapshot(
            `<div class="circle-page"></div>`
        );
    });
});
