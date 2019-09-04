import { createLocalVue, shallowMount } from "@vue/test-utils";
import FooterTop from "../../src/components/FooterTop.vue";
import VueCompositionApi from "@vue/composition-api";

describe("FooterTop.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    it("renders", (): void => {
        const wrapper = shallowMount(FooterTop, {
            localVue
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="footer-top">
              <div class="section">
                <div class="title">Discover</div>
                <div class="item">
                  <router-link to="[object Object]" class="link">
                    Units
                  </router-link>
                </div>
                <div class="item">
                  <router-link to="[object Object]" class="link">
                    Buy a Hardware Wallet
                  </router-link>
                </div>
              </div>
              <!---->
              <div class="section">
                <div class="title">MHW</div>
                <div class="item">
                  <router-link to="[object Object]" class="link">
                    About
                  </router-link>
                </div>
                <div class="item">
                  <router-link to="[object Object]" class="link">
                    FAQs
                  </router-link>
                </div>
                <div class="item customer-service">
                  Customer Support
                </div>
              </div>
              <div class="section">
                <div class="title">
                  Love
                  <img src="../assets/heart.svg" class="love">
                  MHW? Donate!
                </div>
                <div class="item">
                  MyHbarWallet is open-source and free to the community. Your
                  donations go a long way towards making that possible.
                </div>
                <div class="donation"><img src="../assets/icon-hbar-outline2.svg" class="hbar-icon">
                  0.0.1001
                </div>
              </div>
              <modalcustomerservice-stub></modalcustomerservice-stub>
            </div>
        `);
    });
});
