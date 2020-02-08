import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import MnemonicInput from "../../../src/components/MnemonicInput.vue";
import i18n from "../../../src/i18n";

describe("MnemonicInput.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders editable with empty list", (): void => {
        expect.assertions(1);

        const wrapper = mount(MnemonicInput, {
            localVue,
            i18n,
            propsData: {
                words: 12,
                value: [],
                editable: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(
            `<div class="list-container"><label class="list-item"><span class="number">1.</span> <input data-index="1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">2.</span> <input data-index="2" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">3.</span> <input data-index="3" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">4.</span> <input data-index="4" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">5.</span> <input data-index="5" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">6.</span> <input data-index="6" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">7.</span> <input data-index="7" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">8.</span> <input data-index="8" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">9.</span> <input data-index="9" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">10.</span> <input data-index="10" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">11.</span> <input data-index="11" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">12.</span> <input data-index="12" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label></div>`
        );
    });

    it("renders editable with a list", (): void => {
        expect.assertions(1);

        const wrapper = mount(MnemonicInput, {
            localVue,
            i18n,
            propsData: {
                words: 24,
                value: [
                    "milk",
                    "nuclear",
                    "right",
                    "left",
                    "bread",
                    "casket",
                    "beatrice",
                    "balcony",
                    "swallow",
                    "eagle",
                    "vehicle",
                    "catalog",
                    "fury",
                    "indicate",
                    "private",
                    "label",
                    "coach",
                    "sell",
                    "soda",
                    "motion",
                    "divide",
                    "useful",
                    "inhale",
                    "coin"
                ],
                editable: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(
            `<div class="list-container"><label class="list-item"><span class="number">1.</span> <input data-index="1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">2.</span> <input data-index="2" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">3.</span> <input data-index="3" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">4.</span> <input data-index="4" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">5.</span> <input data-index="5" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">6.</span> <input data-index="6" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">7.</span> <input data-index="7" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">8.</span> <input data-index="8" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">9.</span> <input data-index="9" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">10.</span> <input data-index="10" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">11.</span> <input data-index="11" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">12.</span> <input data-index="12" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">13.</span> <input data-index="13" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">14.</span> <input data-index="14" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">15.</span> <input data-index="15" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">16.</span> <input data-index="16" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">17.</span> <input data-index="17" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">18.</span> <input data-index="18" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">19.</span> <input data-index="19" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">20.</span> <input data-index="20" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">21.</span> <input data-index="21" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">22.</span> <input data-index="22" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">23.</span> <input data-index="23" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">24.</span> <input data-index="24" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label></div>`
        );
    });

    it("renders uneditable with empty list", (): void => {
        expect.assertions(1);

        const wrapper = mount(MnemonicInput, {
            localVue,
            i18n,
            propsData: {
                words: 12,
                value: [],
                editable: false
            }
        });

        expect(wrapper).toMatchInlineSnapshot(
            `<div class="list-container"><label class="list-item"><span class="number">1.</span> <input data-index="1" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">2.</span> <input data-index="2" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">3.</span> <input data-index="3" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">4.</span> <input data-index="4" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">5.</span> <input data-index="5" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">6.</span> <input data-index="6" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">7.</span> <input data-index="7" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">8.</span> <input data-index="8" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">9.</span> <input data-index="9" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">10.</span> <input data-index="10" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">11.</span> <input data-index="11" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">12.</span> <input data-index="12" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label></div>`
        );
    });

    it("renders uneditable with a list", (): void => {
        expect.assertions(1);

        const wrapper = mount(MnemonicInput, {
            localVue,
            i18n,
            propsData: {
                words: 24,
                value: [
                    "milk",
                    "nuclear",
                    "right",
                    "left",
                    "bread",
                    "casket",
                    "beatrice",
                    "balcony",
                    "swallow",
                    "eagle",
                    "vehicle",
                    "catalog",
                    "fury",
                    "indicate",
                    "private",
                    "label",
                    "coach",
                    "sell",
                    "soda",
                    "motion",
                    "divide",
                    "useful",
                    "inhale",
                    "coin"
                ],
                editable: false
            }
        });

        expect(wrapper).toMatchInlineSnapshot(
            `<div class="list-container"><label class="list-item"><span class="number">1.</span> <input data-index="1" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">2.</span> <input data-index="2" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">3.</span> <input data-index="3" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">4.</span> <input data-index="4" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">5.</span> <input data-index="5" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">6.</span> <input data-index="6" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">7.</span> <input data-index="7" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">8.</span> <input data-index="8" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">9.</span> <input data-index="9" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">10.</span> <input data-index="10" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">11.</span> <input data-index="11" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">12.</span> <input data-index="12" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">13.</span> <input data-index="13" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">14.</span> <input data-index="14" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">15.</span> <input data-index="15" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">16.</span> <input data-index="16" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">17.</span> <input data-index="17" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">18.</span> <input data-index="18" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">19.</span> <input data-index="19" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">20.</span> <input data-index="20" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">21.</span> <input data-index="21" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">22.</span> <input data-index="22" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">23.</span> <input data-index="23" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label><label class="list-item"><span class="number">24.</span> <input data-index="24" readonly="readonly" tabindex="-1" autocapitalize="off" autocomplete="off" spellcheck="false" type="text" class="word"></label></div>`
        );
    });
});
