import { createLocalVue, shallowMount } from "@vue/test-utils";
import InterfaceNavigation from "../../src/components/InterfaceNavigation.vue";
import VueCompositionApi from "@vue/composition-api";

describe("InterfaceNavigation", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const wrapper = shallowMount(InterfaceNavigation, {
            localVue
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div>
              <div class="side-nav-top menu-closed">
                <div class="logo">My<strong>Hbar</strong>Wallet</div>
                <materialdesignicon-stub size="24" icon="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" class="close"></materialdesignicon-stub>
              </div>
              <nav class="menu-closed">
                <interfacenavigationsection-stub image="" imageactive="" title="Crypto" routes="[object Object],[object Object]"></interfacenavigationsection-stub>
                <!---->
                <!---->
              </nav>
              <div class="side-nav-background menu-closed"></div>
            </div>
        `);
    });
});
