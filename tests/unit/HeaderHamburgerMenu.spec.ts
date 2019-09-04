import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import HeaderHamburgerMenu from "../../src/components/HeaderHamburgerMenu.vue";

describe("HeaderHamburgerMenu.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    it("renders", (): void => {
        const wrapper = mount(HeaderHamburgerMenu, {
            localVue,
            propsData: {
                isOpen: true
            }
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <nav class="nav-open">
              <!---->
              <div class="link-block"><a href="/">
                  <div class="link">Home</div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                  </svg>
                </a></div>
              <div class="link-block"><a href="/#about">
                  <div class="link">About</div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                  </svg>
                </a></div>
              <div class="link-block"><a href="/#faqs">
                  <div class="link">FAQs</div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                  </svg>
                </a></div>
            </nav>
        `);
    });
});
