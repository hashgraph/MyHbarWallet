import { createLocalVue, mount } from "@vue/test-utils";
import Feature from "../../src/components/Feature.vue";
import VueCompositionApi from "@vue/composition-api";

describe("Feature.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(Feature, {
            localVue,
            propsData: {
                image: "https://via.placeholder.com/150",
                title: "title"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="feature"><img src="https://via.placeholder.com/150" alt="" class="image">
              <div class="text">
                <div class="header">
                  title
                </div>
                <div class="content"></div>
              </div>
            </div>
        `);
    });
});
