import { createLocalVue, mount } from "@vue/test-utils";
import ModalEnterAccountId from "../../src/components/ModalEnterAccountId.vue";
import VueCompositionApi from "@vue/composition-api";

describe("ModalEnterAccountId.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        expect.assertions(1);
        const state = {
            modalIsOpen: false,
            isBusy: false,
            account: ""
        };
        const wrapper = mount(ModalEnterAccountId, {
            localVue,
            propsData: {
                state
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-enter-account-id" state="[object Object]">
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Enter Account ID</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                    </svg></header>
                  <div class="main">
                    <div class="notice notice">
                      <div class="symbol-container compact"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                          <path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z"></path>
                        </svg></div>
                      <div class="text">
                        <!---->
                        <div class="message">
                          Hedera Account IDs are three numbers separated by decimals
                          (ex. 0.0.10000). Accounts are controlled by keys. To get an
                          account, another existing account must create and fund a new
                          account on your behalf using your public key.
                        </div>
                      </div>
                    </div>
                    <div class="content-container">
                      <form>
                        <div class="text-input"><label class="label-container">
                            <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="shard.realm.account" type="text" autocomplete="on"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
                    </div></span>
                    <!----></span></label>
                    <!---->
                    <!---->
                  </div>
                  <div class="buttons"><button type="button" class="button outline compact"><span>No Account ID?</span>
                      <!----></button> <button type="submit" disabled="disabled" class="button compact"><span>Continue</span>
                      <!----></button></div>
                  </form>
                </div>
              </div>
            </div>
            </div>
            </div>
        `);
    });
});
