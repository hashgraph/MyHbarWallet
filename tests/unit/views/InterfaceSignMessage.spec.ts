import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import InterfaceSignMessage from "../../../src/ui/views/InterfaceSignMessage.vue";
import i18n from "../../../src/service/i18n";

describe("InterfaceSignMessage.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(InterfaceSignMessage, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <interfaceform-stub title="Sign Message">
              <div class="description">
                Include your nickname and where you use the nickname so someone else cannot use it. Include a specific reason for the message so it cannot be reused for a different purpose.
              </div>
              <div class="text-input-container">
                <textinput-stub label="Message" type="text" multiline="true"></textinput-stub>
              </div>
              <modalconfirmsignmessage-stub publickey="302a300506032b65700321002cc9e2d0c16c717476d4bbbfa3307a98cf0c41d7afc77c851e476b5921f3fb65"></modalconfirmsignmessage-stub>
              <modalmessagesigned-stub></modalmessagesigned-stub>
            </interfaceform-stub>
        `);
    });
});
