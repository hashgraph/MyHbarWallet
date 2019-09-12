import { createLocalVue, mount } from "@vue/test-utils";
import Header from "../../src/components/Header.vue";
import VueRouter from "vue-router";
import router from "../../src/router";
import VueCompositionApi from "@vue/composition-api";
import "../../src/directives";

describe("Header.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(Header, {
            localVue,
            router
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="header-container">
              <header class="header"><a href="/" class="link router-link-exact-active router-link-active">
                  <div class="logo">My<strong>Hbar</strong>Wallet</div>
                </a>
                <div class="spacer"></div>
                <div class="links"><a href="/" class="link router-link-exact-active router-link-active">Home</a> <a href="/#about" class="link">About</a> <a href="/#faqs" class="link">
                    FAQs
                  </a></div>
                <!---->
                <div class="button-wrapper">
                  <div class="bar-1"><svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                      <path d="M19,13H5V11H19V13Z"></path>
                    </svg></div>
                  <div class="bar-2"><svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                      <path d="M19,13H5V11H19V13Z"></path>
                    </svg></div>
                  <div class="bar-3"><svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                      <path d="M19,13H5V11H19V13Z"></path>
                    </svg></div>
                </div>
                <!---->
              </header>
              <nav class="">
                <!----> <a href="/" class="link-block router-link-exact-active router-link-active">
                  <div class="link">Home</div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                  </svg>
                </a> <a href="/#about" class="link-block">
                  <div class="link">About</div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                  </svg>
                </a> <a href="/#faqs" class="link-block">
                  <div class="link">FAQs</div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                  </svg>
                </a>
                <div class="logout-container">
                  <!---->
                </div>
                <div role="dialog" aria-modal="true" class="modal-background">
                  <div class="modal">
                    <!---->
                    <div class="main">
                      <div class="content-container">
                        <div class="modal-forgot-to-logout"><span>Log Out</span>
                          <p>
                            Are you sure?
                          </p>
                          <div class="button-group">
                            <!----> <button type="submit" class="button-logout danger center-button"><span>Log Out of Account</span>
                              <!----></button></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <!---->
                  <div class="main">
                    <div class="content-container">
                      <div class="modal-forgot-to-logout"><span>Log Out</span>
                        <p>
                          Are you sure?
                        </p>
                        <div class="button-group">
                          <!----> <button type="submit" class="button-logout danger center-button"><span>Log Out of Account</span>
                            <!----></button></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
