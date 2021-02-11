import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import { BigNumber } from "bignumber.js";
import { AccountId } from "@hashgraph/sdk";

import TransferList from "../../../src/ui/components/TransferList.vue";
import i18n from "../../../src/service/i18n";
import { Transfer, Asset } from "../../../src/domain/transfer";

const transfers: Transfer[] = [
    {
        from: AccountId.fromString("0.0.1"),
        to: AccountId.fromString("0.0.2"),
        asset: Asset.Hbar,
        amount: new BigNumber(0.1)
    },
    {
        from: AccountId.fromString("0.0.1"),
        to: AccountId.fromString("0.0.2"),
        asset: "0.0.21000",
        amount: new BigNumber(9)
    },
    {
        from: AccountId.fromString("0.0.5"),
        to: AccountId.fromString("0.0.9"),
        asset: Asset.Hbar,
        amount: new BigNumber(0.1)
    },
    {
        from: AccountId.fromString("0.0.2"),
        to: AccountId.fromString("0.0.8"),
        asset: "0.0.9001",
        amount: new BigNumber(0.0005)
    }
];

describe("TransferList.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", async (): Promise<void> => {
        expect.assertions(1);

        const wrapper = mount(TransferList, {
            localVue,
            i18n,
            propsData: { transfers }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="transfer-list">
              <div class="transfer-label">
                Transfers
              </div>
              <!---->
              <div class="transfer-inner-list">
                <div class="transfer"><span class="transfer-to">0.0.2</span> <span class="transfer-asset">Hbar</span> <span class="transfer-amount">0.1</span> <svg width="24" height="24" viewBox="0 0 24 24" class="transfer-delete">
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>
                  </svg></div>
                <div class="transfer"><span class="transfer-to">0.0.2</span> <span class="transfer-asset">0.0.21000</span> <span class="transfer-amount">9</span> <svg width="24" height="24" viewBox="0 0 24 24" class="transfer-delete">
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>
                  </svg></div>
                <div class="transfer"><span class="transfer-to">0.0.9</span> <span class="transfer-asset">Hbar</span> <span class="transfer-amount">0.1</span> <svg width="24" height="24" viewBox="0 0 24 24" class="transfer-delete">
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>
                  </svg></div>
                <div class="transfer"><span class="transfer-to">0.0.8</span> <span class="transfer-asset">0.0.9001</span> <span class="transfer-amount">0.0005</span> <svg width="24" height="24" viewBox="0 0 24 24" class="transfer-delete">
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>
                  </svg></div>
              </div> <button type="submit" class="compact">
                <!----> <span>Add Transfer</span>
                <!---->
              </button>
            </div>
        `);
    });
});
