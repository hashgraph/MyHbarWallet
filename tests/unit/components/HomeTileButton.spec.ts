import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";

import router from "../../../src/ui/router";
import HomeTileButton from "../../../src/ui/components/HomeTileButton.vue";
import i18n from "../../../src/service/i18n";

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
