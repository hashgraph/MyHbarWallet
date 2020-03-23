import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import InterfaceVerifyMessage from "../../../src/ui/views/InterfaceVerifyMessage.vue";
import i18n from "../../../src/service/i18n";

describe("InterfaceVerifyMessage.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(InterfaceVerifyMessage, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="verify-message">
              <interfaceform-stub title="Verify Message">
                <textinput-stub label="Signature" multiline="true" canclear="true" cancopy="true"></textinput-stub>
              </interfaceform-stub>
            </div>
        `);
    });
});
