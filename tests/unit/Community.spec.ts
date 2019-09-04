import { createLocalVue, mount } from "@vue/test-utils";
import Community from "../../src/components/Community.vue";
import VueCompositionApi from "@vue/composition-api";

describe("Community.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);
        const wrapper = mount(Community, {
            localVue
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="community">
              <div class="wrap">
                <div class="head">
                  <div class="title">
                    Join MHW Community
                  </div>
                  <div class="subtitle">
                    Get in the know and see your balance grow (we hope)!
                  </div>
                </div>
                <div class="icons"><a href="https://www.facebook.com" target="_blank" rel="noopener" class="social-icon">
                    <div class="link-content"><img src="" alt="">
                      Facebook
                    </div>
                  </a> <a href="https://www.twitter.com" target="_blank" rel="noopener" class="social-icon">
                    <div class="link-content"><img src="" alt="">
                      Twitter
                    </div>
                  </a> <a href="https://medium.com" target="_blank" rel="noopener" class="social-icon">
                    <div class="link-content"><img src="" alt="">
                      Medium
                    </div>
                  </a> <a href="https://www.reddit.com/" target="_blank" rel="noopener" class="social-icon">
                    <div class="link-content"><img src="" alt="">
                      Reddit
                    </div>
                  </a> <a href="https://github.com" target="_blank" rel="noopener" class="social-icon">
                    <div class="link-content"><img src="" alt="">
                      Github
                    </div>
                  </a></div>
              </div>
            </div>
        `);
    });
});
