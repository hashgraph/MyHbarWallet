import { createLocalVue, mount } from "@vue/test-utils";
import HomeTileButtons from "../../src/components/HomeTileButtons.vue";

describe("HomeTileButtons.vue", (): void => {
    const localVue = createLocalVue();

    it("renders", (): void => {
        const wrapper = mount(HomeTileButtons, { localVue });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="tile-grid">
              <router-link to="[object Object]" class="home-tile-button"><img class="tile-image">
                <div class="content">
                  <div class="title">Create A New Wallet</div>
                  <div class="message">Generate your private key and obtain an account ID. Key saving and security is your responsibility.</div>
                  <div class="action-label">
                    Get Started
                    <svg width="24" height="24" viewBox="0 0 24 24" class="action-icon">
                      <path></path>
                    </svg></div>
                </div>
              </router-link>
              <router-link to="[object Object]" class="home-tile-button"><img class="tile-image">
                <div class="content">
                  <div class="title">Access My Account</div>
                  <div class="message">Manage an account, send or receive hbars, create new accounts, and more!</div>
                  <div class="action-label">
                    Access Now
                    <svg width="24" height="24" viewBox="0 0 24 24" class="action-icon">
                      <path></path>
                    </svg></div>
                </div>
              </router-link>
            </div>
        `);
    });
});
