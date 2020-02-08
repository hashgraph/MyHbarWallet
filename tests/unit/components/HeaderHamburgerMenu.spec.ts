import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";

import HeaderHamburgerMenu from "../../../src/components/HeaderHamburgerMenu.vue";
import i18n from "../../../src/i18n";

describe("HeaderHamburgerMenu.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueRouter);
    localVue.use(VueI18n);
    const router = new VueRouter();

    it("renders", (): void => {
        expect.assertions(1);
        const wrapper = mount(HeaderHamburgerMenu, {
            localVue,
            router,
            i18n,
            propsData: { isOpen: true }
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <nav class="nav-open">
              <!----> <a href="#/" class="link-block router-link-exact-active router-link-active">
                <div class="link">
                  Home
                </div> <svg height="24" width="24" viewBox="0 0 24 24" class="icon">
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                </svg>
              </a> <a href="#/#about" class="link-block">
                <div class="link">
                  About
                </div> <svg height="24" width="24" viewBox="0 0 24 24" class="icon">
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                </svg>
              </a> <a href="#/#faqs" class="link-block">
                <div class="link">
                  FAQs
                </div> <svg height="24" width="24" viewBox="0 0 24 24" class="icon">
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                </svg>
              </a>
              <div class="logout-container"><button type="submit" class="logout outline danger">
                  <!----> <span>Logout</span>
                  <!----></button></div>
            </nav>
        `);
    });
});
