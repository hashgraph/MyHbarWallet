import { createLocalVue, mount } from "@vue/test-utils";
import ModalFeeSummary from "../../src/components/ModalFeeSummary.vue";
import VueCompositionApi from "@vue/composition-api";

describe("ModalFeeSummary.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders open with empty list", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummary, {
            localVue,
            propsData: {
                title: "Title",
                isOpen: true,
                items: []
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary">
              <div role="dialog" aria-modal="true" class="modal-background is-open">
                <div class="modal">
                  <header><span class="title">Transaction Summary</span>
                    <!---->
                  </header>
                  <div class="main">
                    <div class="content-container">
                      <div class="summary-title">Title</div>
                      <div class="separator"></div>
                      <div class="summary">
                        <div class="item"><span class="item-description">Total:</span> <span class="item-value">0 ℏ</span></div>
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

    it("renders closed with empty list", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummary, {
            localVue,
            propsData: {
                title: "TItle",
                isOpen: false,
                items: []
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Transaction Summary</span>
                    <!---->
                  </header>
                  <div class="main">
                    <div class="content-container">
                      <div class="summary-title">TItle</div>
                      <div class="separator"></div>
                      <div class="summary">
                        <div class="item"><span class="item-description">Total:</span> <span class="item-value">0 ℏ</span></div>
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

    it("renders open with list", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummary, {
            localVue,
            propsData: {
                title: "TItle",
                isOpen: true,
                items: [
                    { description: "Description", value: "Value" },
                    { description: "Description", value: "Value" },
                    { description: "Description", value: "Value" }
                ]
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary">
              <div role="dialog" aria-modal="true" class="modal-background is-open">
                <div class="modal">
                  <header><span class="title">Transaction Summary</span>
                    <!---->
                  </header>
                  <div class="main">
                    <div class="content-container">
                      <div class="summary-title">TItle</div>
                      <div class="separator"></div>
                      <div class="summary">
                        <div class="item"><span class="item-description">
                                    Description:
                                </span> <span class="item-value">
                                    Value
                                </span></div>
                        <div class="item"><span class="item-description">
                                    Description:
                                </span> <span class="item-value">
                                    Value
                                </span></div>
                        <div class="item"><span class="item-description">
                                    Description:
                                </span> <span class="item-value">
                                    Value
                                </span></div>
                        <div class="item"><span class="item-description">Total:</span> <span class="item-value">0 ℏ</span></div>
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

    it("renders closed with list", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummary, {
            localVue,
            propsData: {
                title: "TItle",
                isOpen: false,
                items: [
                    { description: "Description", value: "Value" },
                    { description: "Description", value: "Value" },
                    { description: "Description", value: "Value" }
                ]
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Transaction Summary</span>
                    <!---->
                  </header>
                  <div class="main">
                    <div class="content-container">
                      <div class="summary-title">TItle</div>
                      <div class="separator"></div>
                      <div class="summary">
                        <div class="item"><span class="item-description">
                                    Description:
                                </span> <span class="item-value">
                                    Value
                                </span></div>
                        <div class="item"><span class="item-description">
                                    Description:
                                </span> <span class="item-value">
                                    Value
                                </span></div>
                        <div class="item"><span class="item-description">
                                    Description:
                                </span> <span class="item-value">
                                    Value
                                </span></div>
                        <div class="item"><span class="item-description">Total:</span> <span class="item-value">0 ℏ</span></div>
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
