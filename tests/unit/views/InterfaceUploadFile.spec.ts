import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import InterfaceUploadFile from "../../../src/ui/views/InterfaceUploadFile.vue";
import i18n from "../../../src/service/i18n";

describe("InterfaceUploadFile.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(InterfaceUploadFile, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <interfaceform-stub title="Upload">
              <div class="upload-file">
                <uploadzone-stub filename="" class="upload"></uploadzone-stub>
                <div class="buttons">
                  <button-stub label="Upload File" disabled="true" class="upload-button"></button-stub>
                  <button-stub label="Upload File Hash" disabled="true"></button-stub>
                </div>
              </div>
              <modalfeesummary-stub state="[object Object]"></modalfeesummary-stub>
              <modaluploadprogress-stub state="[object Object]"></modaluploadprogress-stub>
              <modalsuccess-stub state="[object Object]">
                <div class="success">
                  <i18n-stub tag="span" path="modalSuccess.txId"><strong></strong></i18n-stub>
                  <i18n-stub tag="span" path="modalSuccess.uploadedFile"><span><strong></strong></span></i18n-stub>
                </div>
              </modalsuccess-stub>
            </interfaceform-stub>
        `);
    });
});
