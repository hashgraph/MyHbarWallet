import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";
import { TokenId } from "@hashgraph/sdk";
import { BigNumber } from "bignumber.js";

import Tokens from "../../../src/ui/components/Tokens.vue";
import i18n from "../../../src/service/i18n";

describe("Tokens.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(Tokens, {
            localVue,
            i18n,
            propsData: {
                tokens: [
                    {
                        tokenId: TokenId.fromString("0.0.1"),
                        balance: new BigNumber(0),
                        decimals: 8
                    },
                    {
                        tokenId: TokenId.fromString("0.0.2"),
                        balance: new BigNumber(0),
                        decimals: 8
                    },
                    {
                        tokenId: TokenId.fromString("0.0.3"),
                        balance: new BigNumber(0),
                        decimals: 8
                    },
                    {
                        tokenId: TokenId.fromString("0.0.4"),
                        balance: new BigNumber(0),
                        decimals: 8
                    }
                ]
            },
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="tokens">
              <div class="token-list">
                <div class="token token">
                  <div class="info">
                    <div class="title"><span class="id">0.0.1</span></div>
                  </div>
                  <div class="balance"><span>0</span></div>
                </div>
                <div class="token token">
                  <div class="info">
                    <div class="title"><span class="id">0.0.2</span></div>
                  </div>
                  <div class="balance"><span>0</span></div>
                </div>
                <div class="token token">
                  <div class="info">
                    <div class="title"><span class="id">0.0.3</span></div>
                  </div>
                  <div class="balance"><span>0</span></div>
                </div>
                <div class="token token">
                  <div class="info">
                    <div class="title"><span class="id">0.0.4</span></div>
                  </div>
                  <div class="balance"><span>0</span></div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders empty", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(Tokens, {
            localVue,
            i18n,
            propsData: { tokens: [] },
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="tokens">
              <div class="empty">
                <div class="notice">
                  <div class="symbol-container compact"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                      <path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z"></path>
                    </svg></div>
                  <div class="text">
                    <!---->
                    <div class="message">
                      No tokens are currently associated with your account.
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
