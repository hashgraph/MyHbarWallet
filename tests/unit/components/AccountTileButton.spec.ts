import { createLocalVue, mount } from "@vue/test-utils";
import AccountTileButton from "../../../src/components/AccountTileButton.vue";
import VueCompositionApi from "@vue/composition-api";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("AccountTileButton.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders disabled", (): void => {
        expect.assertions(1);

        const wrapper = mount(AccountTileButton, {
            localVue,
            i18n,
            propsData: {
                disabled: true,
                title: "title"
            }
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="account-tile-button disabled"><img class="tile-image">
              <div class="text">
                <div class="title">
                  title
                </div>
                <div class="content">

                </div>
                <div class="note">

                </div>
              </div>
            </div>
        `);
    });

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(AccountTileButton, {
            i18n,
            propsData: {
                disabled: false,
                title: "title"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="account-tile-button"><img class="tile-image">
              <div class="text">
                <div class="title">
                  title
                </div>
                <div class="content">

                </div>
                <div class="note">

                </div>
              </div>
            </div>
        `);
    });
});
