import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import InterfaceDeployContract from "../../../src/ui/views/InterfaceDeployContract.vue";
import i18n from "../../../src/service/i18n";

describe("InterfaceDeployContract.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(InterfaceDeployContract, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <interfaceform-stub title="Deploy Contract">
              <textinput-stub label="Byte Code" compact="true" multiline="true" canclear="true" cancopy="true" showvalidation="true" class="deploy-contract-form-item"></textinput-stub>
              <textinput-stub label="ABI/JSONInterface" multiline="true" canclear="true" cancopy="true" showvalidation="true" class="deploy-contract-form-item"></textinput-stub>
              <textinput-stub label="Maximum Transaction Fee" showvalidation="true" class="deploy-contract-form-item"></textinput-stub>
            </interfaceform-stub>
        `);
    });
});
