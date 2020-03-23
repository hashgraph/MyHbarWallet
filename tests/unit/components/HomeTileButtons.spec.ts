import { createLocalVue, mount } from "@vue/test-utils";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";

import HomeTileButtons from "../../../src/ui/components/HomeTileButtons.vue";
import router from "../../../src/ui/router";
import i18n from "../../../src/service/i18n";

describe("HomeTileButtons.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(HomeTileButtons, {
            localVue,
            i18n,
            router,
            stubs: { MaterialDesignIcon: true }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="tile-grid"><a href="/create-account" class="home-tile-button"><img class="tile-image">
                <div class="content">
                  <div class="title">
                    Create New Account
                  </div>
                  <div class="message">
                    Generate your private key and obtain an account ID. Key saving and security is your responsibility.
                  </div>
                  <div class="action-label">
                    Get Started
                    <materialdesignicon-stub class="action-icon"></materialdesignicon-stub>
                  </div>
                </div>
              </a> <a href="/access-my-account" class="home-tile-button"><img class="tile-image">
                <div class="content">
                  <div class="title">
                    Access My Account
                  </div>
                  <div class="message">
                    Manage an account, send or receive hbars, create new accounts, and more!
                  </div>
                  <div class="action-label">
                    Access Now
                    <materialdesignicon-stub class="action-icon"></materialdesignicon-stub>
                  </div>
                </div>
              </a></div>
        `);
    });
});
