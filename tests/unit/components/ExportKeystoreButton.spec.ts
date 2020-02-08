import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ExportKeystoreButton from "../../../src/components/ExportKeystoreButton.vue";
import i18n from "../../../src/i18n";

describe("ExportKeystoreButton.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = mount(ExportKeystoreButton, {
            localVue,
            i18n
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <span class="download-button"><div class="tooltip-container"><div class="slot-container"><svg height="24" width="24" viewBox="0 0 24 24" class="export-keystore-icon"><path d="M14,2H6C4.89,2 4,2.89 4,4V20C4,21.11 4.89,22 6,22H18C19.11,22 20,21.11 20,20V8L14,2M12,19L8,15H10.5V12H13.5V15H16L12,19M13,9V3.5L18.5,9H13Z"></path></svg></div> <div class="message">
                Download Keystore File
              </div></div> <div class="modal-export-generate-keystore"><!----></div> <div class="modal-export-download-keystore"><!----></div></span>
        `);
    });
});
