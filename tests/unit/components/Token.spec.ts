import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import { TokenId } from "@hashgraph/sdk";
import { BigNumber } from "bignumber.js";

import Token from "../../../src/ui/components/Token.vue";
import i18n from "../../../src/service/i18n";

describe("Token.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(Token, {
            localVue,
            i18n,
            propsData: {
                token: {
                    tokenId: TokenId.fromString("0.0.1"),
                    balance: new BigNumber(0),
                    decimals: 8
                }
            },
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="token">
              <div class="info">
                <div class="title"><span class="id">0.0.1</span></div>
              </div>
              <div class="balance"><span>0</span></div>
            </div>
        `);
    });
});
