import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueRouter from "vue-router";
import HeaderHamburgerMenu from "../../../src/components/HeaderHamburgerMenu.vue";
import router from "../../../src/router";

describe("HeaderHamburgerMenu.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueRouter);

    it("renders", (): void => {
        expect.assertions(1);
        const wrapper = mount(HeaderHamburgerMenu, {
            localVue,
            router,
            propsData: {
                isOpen: true
            }
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <nav class="nav-open">
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
        `);
    });
});
