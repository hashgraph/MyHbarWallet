import { mount, createLocalVue } from "@vue/test-utils";
import ModalFeeSummaryItems from "../../src/components/ModalFeeSummaryItems.vue";
import VueCompositionApi from "@vue/composition-api";
import BigNumber from "bignumber.js";

describe("ModalFeeSummaryItems.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    const items = [
        { description: "description", value: new BigNumber(1.23) },
        { description: "description", value: "public key" },
        { description: "description", value: new BigNumber(3.45) }
    ];

    it("renders with mixed item values", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummaryItems, {
            localVue,
            propsData: {
                items
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary-items">
              <div class="modal-fee-summary-item"><span class="description"> description: </span> <span class="value bignumber"><span class="whole">1</span> <span class="fraction">.23</span> <span class="symbol">ℏ</span></span></div>
              <div class="modal-fee-summary-item"><span class="description"> description: </span> <span class="value string">
                    public key
                </span></div>
              <div class="modal-fee-summary-item"><span class="description"> description: </span> <span class="value bignumber"><span class="whole">3</span> <span class="fraction">.45</span> <span class="symbol">ℏ</span></span></div>
              <div class="modal-fee-summary-item total"><span class="description"> Total: </span> <span class="value bignumber"><span class="whole">4</span> <span class="fraction">.68</span> <span class="symbol">ℏ</span></span></div>
            </div>
        `);
    });
});
