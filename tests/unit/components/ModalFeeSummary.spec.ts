import { createLocalVue, mount } from "@vue/test-utils";
import ModalFeeSummary from "../../../src/components/ModalFeeSummary.vue";
import VueCompositionApi from "@vue/composition-api";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("ModalFeeSummary.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    const TITLE = "Title";
    const AMOUNT = "100";
    const ACCOUNT = "999.999.999";

    const ITEMS = [
        { description: "Description", value: "Value" },
        { description: "Description", value: "Value" },
        { description: "Description", value: "Value" }
    ];

    it("renders closed, empty list, transfer", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummary, {
            localVue,
            i18n,
            propsData: {
                title: TITLE,
                isOpen: false,
                items: [],
                amount: AMOUNT,
                account: ACCOUNT,
                txType: "transfer"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary" title="Title">
              <!---->
            </div>
        `);
    });

    it("renders closed, empty list, create account", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummary, {
            localVue,
            i18n,
            propsData: {
                title: TITLE,
                isOpen: false,
                items: [],
                amount: AMOUNT,
                account: ACCOUNT,
                txType: "createAccount"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary" title="Title">
              <!---->
            </div>
        `);
    });

    it("renders closed, with list, transfer", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummary, {
            localVue,
            i18n,
            propsData: {
                title: TITLE,
                isOpen: false,
                items: ITEMS,
                amount: AMOUNT,
                account: ACCOUNT,
                txType: "transfer"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary" title="Title">
              <!---->
            </div>
        `);
    });

    it("renders closed, with list, createAccount", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummary, {
            localVue,
            i18n,
            propsData: {
                title: TITLE,
                isOpen: false,
                items: [],
                amount: AMOUNT,
                account: ACCOUNT,
                txType: "transfer"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary" title="Title">
              <!---->
            </div>
        `);
    });

    it("renders open, empty list, transfer", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummary, {
            localVue,
            i18n,
            propsData: {
                title: TITLE,
                isOpen: true,
                items: [],
                amount: AMOUNT,
                account: ACCOUNT,
                txType: "transfer"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary" title="Title">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Transaction Summary</span>
                    <!---->
                  </header>
                  <div class="main">
                    <div class="content-container">
                      <div class="modal-fee-summary-title"><span class="title"><span>Sending <strong>100</strong> ℏ to account <strong>999.999.999</strong></span></span></div>
                      <div class="separator"></div>
                      <div class="modal-fee-summary-items">
                        <div class="row total">
                          <div class="description">
                            Total
                          </div>
                          <div class="value">0 </div>
                          <div class="symbol value">
                            ℏ
                          </div>
                        </div>
                      </div>
                      <div class="buttons"><button type="button" class="button outline compact"><span>Cancel</span>
                          <!----></button> <button type="submit" class="button compact"><span>Continue</span>
                          <!----></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders open, empty list, create account", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummary, {
            localVue,
            i18n,
            propsData: {
                title: TITLE,
                isOpen: false,
                items: [],
                amount: AMOUNT,
                account: ACCOUNT,
                txType: "createAccount"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary" title="Title">
              <!---->
            </div>
        `);
    });

    it("renders open, with list, transfer", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummary, {
            localVue,
            i18n,
            propsData: {
                title: TITLE,
                isOpen: false,
                items: ITEMS,
                amount: AMOUNT,
                account: ACCOUNT,
                txType: "transfer"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary" title="Title">
              <!---->
            </div>
        `);
    });

    it("renders open, with list, create account", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummary, {
            localVue,
            i18n,
            propsData: {
                title: TITLE,
                isOpen: true,
                items: ITEMS,
                amount: AMOUNT,
                account: ACCOUNT,
                txType: "createAccount"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary" title="Title">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Transaction Summary</span>
                    <!---->
                  </header>
                  <div class="main">
                    <div class="content-container">
                      <div class="modal-fee-summary-title"><span class="title"><span>Creating account with balance <strong>100</strong> ℏ</span></span></div>
                      <div class="separator"></div>
                      <div class="modal-fee-summary-items">
                        <div class="row">
                          <div class="description">
                            Description
                          </div>
                          <div class="value">Value</div>
                          <div class="symbol value">
                            ℏ
                          </div>
                        </div>
                        <div class="row">
                          <div class="description">
                            Description
                          </div>
                          <div class="value">Value</div>
                          <div class="symbol value">
                            ℏ
                          </div>
                        </div>
                        <div class="row">
                          <div class="description">
                            Description
                          </div>
                          <div class="value">Value</div>
                          <div class="symbol value">
                            ℏ
                          </div>
                        </div>
                        <div class="row total">
                          <div class="description">
                            Total
                          </div>
                          <div class="value">0 </div>
                          <div class="symbol value">
                            ℏ
                          </div>
                        </div>
                      </div>
                      <div class="buttons"><button type="button" class="button outline compact"><span>Cancel</span>
                          <!----></button> <button type="submit" class="button compact"><span>Continue</span>
                          <!----></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders open, invalid item in list, transfer", (): void => {
        expect.assertions(1);

        const invalidItems = [{ description: "Description", value: "Balue" }];

        const wrapper = mount(ModalFeeSummary, {
            localVue,
            i18n,
            propsData: {
                title: TITLE,
                isOpen: true,
                items: invalidItems,
                amount: AMOUNT,
                account: ACCOUNT,
                txType: "transfer"
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary" title="Title">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Transaction Summary</span>
                    <!---->
                  </header>
                  <div class="main">
                    <div class="content-container">
                      <div class="modal-fee-summary-title"><span class="title"><span>Sending <strong>100</strong> ℏ to account <strong>999.999.999</strong></span></span></div>
                      <div class="separator"></div>
                      <div class="modal-fee-summary-items">
                        <div class="row">
                          <div class="description">
                            Description
                          </div>
                          <div class="value">Balue</div>
                          <div class="symbol value">
                            ℏ
                          </div>
                        </div>
                        <div class="row total">
                          <div class="description">
                            Total
                          </div>
                          <div class="value">0 </div>
                          <div class="symbol value">
                            ℏ
                          </div>
                        </div>
                      </div>
                      <div class="buttons"><button type="button" class="button outline compact"><span>Cancel</span>
                          <!----></button> <button type="submit" class="button compact"><span>Continue</span>
                          <!----></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
