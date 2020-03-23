import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import InterfaceInteractWithContract from "../../../src/ui/views/InterfaceInteractWithContract.vue";
import i18n from "../../../src/service/i18n";

describe("InterfaceInteractWithContract.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(InterfaceInteractWithContract, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="interact-with-contract">
              <interfaceform-stub title="Interact With Contract">
                <textinput-stub placeholder="shard.realm.account or account" label="Contract" showvalidation="true"></textinput-stub>
                <textinput-stub label="ABI/JSONInterface" multiline="true" canclear="true" cancopy="true" showvalidation="true"></textinput-stub>
              </interfaceform-stub>
            </div>
        `);
    });
});
