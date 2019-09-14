import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import MnemonicInput from "../../../src/components/MnemonicInput.vue";

describe("MnemonicInput.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders editable with empty list", (): void => {
        expect.assertions(1);

        const wrapper = mount(MnemonicInput, {
            localVue,
            propsData: {
                words: 12,
                value: [],
                editable: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(
            `<div class="list-container"><label class="list-item"><span class="number">1.</span> <input type="text" data-index="1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">2.</span> <input type="text" data-index="2" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">3.</span> <input type="text" data-index="3" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">4.</span> <input type="text" data-index="4" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">5.</span> <input type="text" data-index="5" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">6.</span> <input type="text" data-index="6" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">7.</span> <input type="text" data-index="7" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">8.</span> <input type="text" data-index="8" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">9.</span> <input type="text" data-index="9" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">10.</span> <input type="text" data-index="10" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">11.</span> <input type="text" data-index="11" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">12.</span> <input type="text" data-index="12" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label></div>`
        );
    });

    it("renders editable with a list", (): void => {
        expect.assertions(1);

        const wrapper = mount(MnemonicInput, {
            localVue,
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
            `<div class="list-container"><label class="list-item"><span class="number">1.</span> <input type="text" data-index="1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">2.</span> <input type="text" data-index="2" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">3.</span> <input type="text" data-index="3" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">4.</span> <input type="text" data-index="4" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">5.</span> <input type="text" data-index="5" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">6.</span> <input type="text" data-index="6" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">7.</span> <input type="text" data-index="7" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">8.</span> <input type="text" data-index="8" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">9.</span> <input type="text" data-index="9" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">10.</span> <input type="text" data-index="10" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">11.</span> <input type="text" data-index="11" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">12.</span> <input type="text" data-index="12" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">13.</span> <input type="text" data-index="13" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">14.</span> <input type="text" data-index="14" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">15.</span> <input type="text" data-index="15" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">16.</span> <input type="text" data-index="16" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">17.</span> <input type="text" data-index="17" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">18.</span> <input type="text" data-index="18" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">19.</span> <input type="text" data-index="19" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">20.</span> <input type="text" data-index="20" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">21.</span> <input type="text" data-index="21" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">22.</span> <input type="text" data-index="22" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">23.</span> <input type="text" data-index="23" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">24.</span> <input type="text" data-index="24" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label></div>`
        );
    });

    it("renders uneditable with empty list", (): void => {
        expect.assertions(1);

        const wrapper = mount(MnemonicInput, {
            localVue,
            propsData: {
                words: 12,
                value: [],
                editable: false
            }
        });

        expect(wrapper).toMatchInlineSnapshot(
            `<div class="list-container"><label class="list-item"><span class="number">1.</span> <input type="text" readonly="readonly" data-index="1" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">2.</span> <input type="text" readonly="readonly" data-index="2" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">3.</span> <input type="text" readonly="readonly" data-index="3" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">4.</span> <input type="text" readonly="readonly" data-index="4" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">5.</span> <input type="text" readonly="readonly" data-index="5" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">6.</span> <input type="text" readonly="readonly" data-index="6" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">7.</span> <input type="text" readonly="readonly" data-index="7" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">8.</span> <input type="text" readonly="readonly" data-index="8" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">9.</span> <input type="text" readonly="readonly" data-index="9" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">10.</span> <input type="text" readonly="readonly" data-index="10" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">11.</span> <input type="text" readonly="readonly" data-index="11" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">12.</span> <input type="text" readonly="readonly" data-index="12" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label></div>`
        );
    });

    it("renders uneditable with a list", (): void => {
        expect.assertions(1);

        const wrapper = mount(MnemonicInput, {
            localVue,
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
            `<div class="list-container"><label class="list-item"><span class="number">1.</span> <input type="text" readonly="readonly" data-index="1" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">2.</span> <input type="text" readonly="readonly" data-index="2" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">3.</span> <input type="text" readonly="readonly" data-index="3" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">4.</span> <input type="text" readonly="readonly" data-index="4" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">5.</span> <input type="text" readonly="readonly" data-index="5" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">6.</span> <input type="text" readonly="readonly" data-index="6" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">7.</span> <input type="text" readonly="readonly" data-index="7" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">8.</span> <input type="text" readonly="readonly" data-index="8" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">9.</span> <input type="text" readonly="readonly" data-index="9" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">10.</span> <input type="text" readonly="readonly" data-index="10" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">11.</span> <input type="text" readonly="readonly" data-index="11" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">12.</span> <input type="text" readonly="readonly" data-index="12" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">13.</span> <input type="text" readonly="readonly" data-index="13" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">14.</span> <input type="text" readonly="readonly" data-index="14" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">15.</span> <input type="text" readonly="readonly" data-index="15" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">16.</span> <input type="text" readonly="readonly" data-index="16" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">17.</span> <input type="text" readonly="readonly" data-index="17" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">18.</span> <input type="text" readonly="readonly" data-index="18" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">19.</span> <input type="text" readonly="readonly" data-index="19" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">20.</span> <input type="text" readonly="readonly" data-index="20" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">21.</span> <input type="text" readonly="readonly" data-index="21" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">22.</span> <input type="text" readonly="readonly" data-index="22" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">23.</span> <input type="text" readonly="readonly" data-index="23" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label><label class="list-item"><span class="number">24.</span> <input type="text" readonly="readonly" data-index="24" tabindex="-1" autocomplete="off" autocapitalize="off" spellcheck="false" class="word"></label></div>`
        );
    });
});
