import HomeTileButtons from "../../src/components/HomeTileButtons.vue";
import VueCompositionApi from "@vue/composition-api";
import VueRouter from "vue-router";
import { createLocalVue, shallowMount } from "@vue/test-utils";

describe("HomeTileButtons.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueRouter);

    it("renders", (): void => {
        const wrapper = shallowMount(HomeTileButtons, {
            localVue,
            propsData: {
                name: "name",
                image: "https://via.placeholder.com/150"
            }
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="tile-grid" name="name" image="https://via.placeholder.com/150">
              <hometilebutton-stub route="create-account" title="Create A New Wallet" content="Generate your private key and obtain an account ID. Key saving and security is your responsibility." action="Get Started" image=""></hometilebutton-stub>
              <hometilebutton-stub route="access-my-account" title="Access My Account" content="Manage an account, send or receive hbars, create new accounts, and more!" action="Access Now" image=""></hometilebutton-stub>
            </div>
        `);
    });
});
