import { createLocalVue, mount } from "@vue/test-utils";
import ModalFeeSummaryItems from "../../../src/components/ModalFeeSummaryItems.vue";
import VueCompositionApi from "@vue/composition-api";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("ModalFeeSummaryItems.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    const items = [
        { description: "description", value: "value" },
        { description: "description", value: "public key" }
    ];

    it("renders with empty list", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummaryItems, {
            localVue,
            i18n,
            propsData: {
                items: []
            }
        });

        expect(wrapper).toMatchInlineSnapshot(
            `<div class="modal-fee-summary-items"></div>`
        );
    });

    it("renders with values", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummaryItems, {
            localVue,
            i18n,
            propsData: {
                items
            }
        });

        expect(wrapper).toMatchInlineSnapshot(
            `<div class="modal-fee-summary-items"></div>`
        );
    });
});
