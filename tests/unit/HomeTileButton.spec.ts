import { createLocalVue, shallowMount } from "@vue/test-utils";
import HomeTileButton from "../../src/components/HomeTileButton.vue";
import VueCompositionApi from "@vue/composition-api";
import VueRouter from "vue-router";

describe("HomeTileButton.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueRouter);

    it("renders", (): void => {
        const wrapper = shallowMount(HomeTileButton, {
            localVue,
            propsData: {
                route: "",
                title: "title"
            }
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <router-link-stub to="[object Object]" tag="a" event="click" class="home-tile-button"><img class="tile-image">
              <div class="content">
                <div class="title">title</div>
                <div class="message"></div>
                <!---->
              </div>
            </router-link-stub>
        `);
    });
});
