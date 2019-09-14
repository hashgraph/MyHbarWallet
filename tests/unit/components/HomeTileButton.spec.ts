import { createLocalVue, mount } from "@vue/test-utils";
import HomeTileButton from "../../../src/components/HomeTileButton.vue";
import VueCompositionApi from "@vue/composition-api";
import VueRouter from "vue-router";
import router from "../../../src/router";

describe("HomeTileButton.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueRouter);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(HomeTileButton, {
            localVue,
            router,
            propsData: {
                route: "",
                title: "title"
            }
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <a href="/" class="home-tile-button router-link-exact-active router-link-active"><img class="tile-image">
              <div class="content">
                <div class="title">title</div>
                <div class="message"></div>
                <!---->
              </div>
            </a>
        `);
    });
});
