import { createLocalVue, mount } from "@vue/test-utils";
import HomeTileButton from "../../src/components/HomeTileButton.vue";
import VueCompositionApi from "@vue/composition-api";

describe("HomeTileButton.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const wrapper = mount(HomeTileButton, {
            localVue,
            propsData: {
                route: "",
                title: "title"
            }
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <router-link to="[object Object]" class="home-tile-button"><img class="tile-image">
              <div class="content">
                <div class="title">title</div>
                <div class="message"></div>
                <!---->
              </div>
            </router-link>
        `);
    });
});
