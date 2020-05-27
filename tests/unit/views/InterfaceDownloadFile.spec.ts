import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import InterfaceDownloadFile from "../../../src/ui/views/InterfaceDownloadFile.vue";
import i18n from "../../../src/service/i18n";

describe("InterfaceDownloadFile.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(InterfaceDownloadFile, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <interfaceform-stub title="Download">
              <div class="download-container">
                <idinput-stub error="" label="File ID" file="true" show-validation="" class="file-id"></idinput-stub>
                <button-stub label="Download File" disabled="true" class="button"></button-stub>
              </div>
              <modalfeesummary-stub state="[object Object]"></modalfeesummary-stub>
              <modalsuccess-stub state="[object Object]">
                <i18n-stub tag="span" path="modalSuccess.downloadFile"><strong>0.0.0</strong></i18n-stub>
              </modalsuccess-stub>
            </interfaceform-stub>
        `);
    });
});
