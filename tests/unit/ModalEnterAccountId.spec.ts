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
            <div role="dialog" aria-modal="true" class="modal-background" state="[object Object]">
              <div class="modal">
                <header><span class="title">Enter Account ID</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                  </svg></header>
                <div class="main">
                  <div class="content-container">
                    <form>
                      <div class="text-input"><label class="label-container">
                          <!----> <span class="input-container"><!----> <span class="input-wrapper"><input placeholder="shard.realm.account" type="text" autocomplete="on"> <span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></span>
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
        `);
    });
});
