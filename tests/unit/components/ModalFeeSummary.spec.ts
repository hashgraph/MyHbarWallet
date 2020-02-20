import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalFeeSummary from "../../../src/components/ModalFeeSummary.vue";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";
import BigNumber from "bignumber.js";

describe("ModalLogOut.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const onSubmit = jest.fn();
        const wrapper = mount(ModalFeeSummary, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: true,
                    isBusy: false,
                    isFileSummary: false,
                    account: "0.0.1",
                    amount: "1000",
                    items: [
                        {
                            description: "Description",
                            value: new BigNumber("0")
                        }
                    ],
                    txType: "transfer",
                    submitLabel: "Transfer",
                    cancelLabel: "Cancel",
                    termsShowNonOperator: true
                }
            },
            listeners: { change: onChange, submit: onSubmit }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary">
              <div transition="modal-fade" role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Transaction Summary</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                    </svg></header>
                  <!---->
                  <div class="main">
                    <div class="content-container">
                      <div class="modal-fee-summary-title"><span class="title"><span>Sending <strong>1000</strong> ℏ to account <strong>0.0.1</strong></span></span></div>
                      <div class="separator"></div>
                      <div class="modal-fee-summary-terms">
                        <!---->
                        <!---->
                        <div class="term"><span class="description">Receiver</span> <span class="value">0.0.1</span></div>
                      </div>
                      <div class="modal-fee-summary-items">
                        <div class="row">
                          <div class="description">
                            Description
                            &nbsp;
                            <!---->
                          </div>
                          <div class="value">
                            0
                          </div>
                          <div class="symbol value">
                            ℏ
                          </div>
                        </div>
                        <div class="row total">
                          <div class="description">
                            Total
                            &nbsp;
                            <!---->
                          </div>
                          <div class="value">
                            0
                          </div>
                          <div class="symbol value">
                            ℏ
                          </div>
                        </div>
                      </div>
                      <div class="buttons"><button type="button" class="button outline compact">
                          <!----> <span>Cancel</span>
                          <!----></button> <button type="submit" class="button compact">
                          <!----> <span>Transfer</span>
                          <!----></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
