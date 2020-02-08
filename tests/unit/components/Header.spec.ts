import { createLocalVue, mount } from "@vue/test-utils";
import VueRouter from "vue-router";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import Header from "../../../src/components/Header.vue";
import "../../../src/directives";
import i18n from "../../../src/i18n";

describe("Header.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);
    const router = new VueRouter();

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(Header, {
            localVue,
            i18n,
            router
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="header-container">
              <header class="header"><a href="#/" class="link router-link-exact-active router-link-active"><img alt="" src="../assets/myhbarwallet-logo.svg" class="logo"></a>
                <div class="spacer"></div>
                <div class="links"><a href="#/" class="link router-link-exact-active router-link-active">
                    Home
                  </a> <a href="#/#about" class="link">
                    About
                  </a> <a href="#/#faqs" class="link">
                    FAQs
                  </a></div>
                <!---->
                <div class="button-wrapper">
                  <div class="bar-1"><svg height="24" width="24" viewBox="0 0 24 24" class="icon">
                      <path d="M19,13H5V11H19V13Z"></path>
                    </svg></div>
                  <div class="bar-2"><svg height="24" width="24" viewBox="0 0 24 24" class="icon">
                      <path d="M19,13H5V11H19V13Z"></path>
                    </svg></div>
                  <div class="bar-3"><svg height="24" width="24" viewBox="0 0 24 24" class="icon">
                      <path d="M19,13H5V11H19V13Z"></path>
                    </svg></div>
                </div>
                <!---->
              </header>
              <nav class="">
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
              <!---->
            </div>
        `);
    });
});
