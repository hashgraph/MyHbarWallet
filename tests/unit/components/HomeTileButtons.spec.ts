import { createLocalVue, mount } from "@vue/test-utils";
import HomeTileButtons from "../../../src/components/HomeTileButtons.vue";
import VueRouter from "vue-router";
import router from "../../../src/router";

describe("HomeTileButtons.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(HomeTileButtons, {
            localVue,
            router,
            stubs: {
                MaterialDesignIcon: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="tile-grid"><a href="/create-account" class="home-tile-button"><img class="tile-image">
                <div class="content">
                  <div class="title">Create A New Wallet</div>
                  <div class="message">Generate your private key and obtain an account ID. Key saving and security is your responsibility.</div>
                  <div class="action-label">
                    Get Started
                    <materialdesignicon-stub class="action-icon"></materialdesignicon-stub>
                  </div>
                </div>
              </a> <a href="/access-my-account" class="home-tile-button"><img class="tile-image">
                <div class="content">
                  <div class="title">Access My Account</div>
                  <div class="message">Manage an account, send or receive hbars, create new accounts, and more!</div>
                  <div class="action-label">
                    Access Now
                    <materialdesignicon-stub class="action-icon"></materialdesignicon-stub>
                  </div>
                </div>
              </a></div>
        `);
    });
});
