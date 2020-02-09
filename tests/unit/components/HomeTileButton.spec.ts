import { createLocalVue, mount } from "@vue/test-utils";
import HomeTileButton from "../../../src/components/HomeTileButton.vue";
import VueCompositionApi from "@vue/composition-api";
import VueRouter from "vue-router";
import router from "../../../src/router";
import VueI18n from "vue-i18n";
import i18n from "../../../src/i18n";

describe("HomeTileButton.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueRouter);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(HomeTileButton, {
            localVue,
            i18n,
            router,
            propsData: {
                route: "",
                title: "title"
            }
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <a href="/" class="home-tile-button router-link-exact-active router-link-active"><img class="tile-image">
              <div class="content">
                <div class="title">
                  title
                </div>
                <div class="message">

                </div>
                <!---->
              </div>
            </a>
        `);
    });
});
