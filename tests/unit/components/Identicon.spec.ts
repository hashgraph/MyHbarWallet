import { createLocalVue, mount } from "@vue/test-utils";
import Identicon from "../../../src/components/Identicon.vue";
import VueCompositionApi from "@vue/composition-api";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("Identicon.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(Identicon, {
            localVue,
            i18n,
            propsData: {
                size: 150,
                value: "this-is-a-test"
            }
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150" preserveAspectRatio="xMidYMid meet">
              <path fill="#e5e5e5" d="M75 13L75 44L44 44ZM106 44L75 44L75 13ZM75 137L75 106L106 106ZM44 106L75 106L75 137ZM44 44L44 75L13 75ZM137 75L106 75L106 44ZM106 106L106 75L137 75ZM13 75L44 75L44 106Z"></path>
              <path fill="#92cc66" d="M18.2 28.5a10.3,10.3 0 1,1 20.7,0a10.3,10.3 0 1,1 -20.7,0M111.2 28.5a10.3,10.3 0 1,1 20.7,0a10.3,10.3 0 1,1 -20.7,0M111.2 121.5a10.3,10.3 0 1,1 20.7,0a10.3,10.3 0 1,1 -20.7,0M18.2 121.5a10.3,10.3 0 1,1 20.7,0a10.3,10.3 0 1,1 -20.7,0M75 59.5L75 75L59.5 75ZM90.5 75L75 75L75 59.5ZM75 90.5L75 75L90.5 75ZM59.5 75L75 75L75 90.5Z"></path>
            </svg>
        `);
    });
});
