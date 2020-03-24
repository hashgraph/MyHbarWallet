import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import MnemonicInput from "../../../src/ui/components/MnemonicInput.vue";
import i18n from "../../../src/service/i18n";

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
                editable: true,
                isOpen: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="mnemonic-input">
              <div class="list-container"><label class="list-item"><span class="number">1.</span> <input type="text" data-index="1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">2.</span> <input type="text" data-index="2" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">3.</span> <input type="text" data-index="3" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">4.</span> <input type="text" data-index="4" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">5.</span> <input type="text" data-index="5" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">6.</span> <input type="text" data-index="6" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">7.</span> <input type="text" data-index="7" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">8.</span> <input type="text" data-index="8" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">9.</span> <input type="text" data-index="9" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">10.</span> <input type="text" data-index="10" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">11.</span> <input type="text" data-index="11" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">12.</span> <input type="text" data-index="12" autocomplete="off" autocapitalize="off" class="word"></label></div>
              <!---->
            </div>
        `);
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
                editable: true,
                isOpen: true
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="mnemonic-input">
              <div class="list-container"><label class="list-item"><span class="number">1.</span> <input type="text" data-index="1" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">2.</span> <input type="text" data-index="2" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">3.</span> <input type="text" data-index="3" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">4.</span> <input type="text" data-index="4" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">5.</span> <input type="text" data-index="5" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">6.</span> <input type="text" data-index="6" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">7.</span> <input type="text" data-index="7" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">8.</span> <input type="text" data-index="8" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">9.</span> <input type="text" data-index="9" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">10.</span> <input type="text" data-index="10" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">11.</span> <input type="text" data-index="11" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">12.</span> <input type="text" data-index="12" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">13.</span> <input type="text" data-index="13" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">14.</span> <input type="text" data-index="14" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">15.</span> <input type="text" data-index="15" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">16.</span> <input type="text" data-index="16" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">17.</span> <input type="text" data-index="17" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">18.</span> <input type="text" data-index="18" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">19.</span> <input type="text" data-index="19" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">20.</span> <input type="text" data-index="20" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">21.</span> <input type="text" data-index="21" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">22.</span> <input type="text" data-index="22" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">23.</span> <input type="text" data-index="23" autocomplete="off" autocapitalize="off" class="word"></label><label class="list-item"><span class="number">24.</span> <input type="text" data-index="24" autocomplete="off" autocapitalize="off" class="word"></label></div>
              <!---->
            </div>
        `);
    });
});
