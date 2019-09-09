import { createLocalVue, mount } from "@vue/test-utils";
import ModalFeeSummaryTitle from "../../../src/components/ModalFeeSummaryTitle.vue";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import i18n from "../../../src/i18n";

describe("ModalFeeSummaryTitle.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders, transfer", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummaryTitle, {
            localVue,
            i18n,
            propsData: {
                amount: "999999999",
                account: "0.0.1",
                type: "transfer"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(
            `<div class="modal-fee-summary-title"><span class="title"><span>Sending <strong>999999999</strong> ℏ to account  </span></span></div>`
        );
    });

    it("renders, create account", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummaryTitle, {
            localVue,
            i18n,
            propsData: {
                amount: "999999999",
                account: "",
                type: "createAccount"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(
            `<div class="modal-fee-summary-title"><span class="title"><span>Creating account with balance <strong>999999999</strong> ℏ</span></span></div>`
        );
    });
});
