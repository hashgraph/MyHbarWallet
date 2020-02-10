import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import Community from "../../../src/components/Community.vue";
import i18n from "../../../src/i18n";

describe("Community.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(Community, {
            localVue,
            i18n
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
                <div class="icons"><a href="https://www.facebook.com" rel="noopener" target="_blank" class="social-icon">
                    <div class="link-content"><img src="" alt="">
                      Facebook
                    </div>
                  </a> <a href="https://www.twitter.com" rel="noopener" target="_blank" class="social-icon">
                    <div class="link-content"><img src="" alt="">
                      Twitter
                    </div>
                  </a> <a href="https://medium.com" rel="noopener" target="_blank" class="social-icon">
                    <div class="link-content"><img src="" alt="">
                      Medium
                    </div>
                  </a> <a href="https://www.reddit.com/" rel="noopener" target="_blank" class="social-icon">
                    <div class="link-content"><img src="" alt="">
                      Reddit
                    </div>
                  </a> <a href="https://github.com" rel="noopener" target="_blank" class="social-icon">
                    <div class="link-content"><img src="" alt="">
                      Github
                    </div>
                  </a></div>
              </div>
            </div>
        `);
    });
});
