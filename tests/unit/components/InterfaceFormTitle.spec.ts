import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import InterfaceFormTitle from "../../../src/components/InterfaceFormTitle.vue";
import i18n from "../../../src/i18n";

describe("InterfaceForm.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const title =
            "Bacon ipsum dolor amet strip steak pork chop eu consequat pork belly excepteur.";

        const wrapper = mount(InterfaceFormTitle, {
            localVue,
            i18n,
            propsData: { title }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="interface-form-title-container">
              <div class="interface-form-title">
                Bacon ipsum dolor amet strip steak pork chop eu consequat pork belly excepteur.
              </div> <button type="submit" class="">
                <!----> <span>Menu</span>
                <!----></button>
            </div>
        `);
    });
});
