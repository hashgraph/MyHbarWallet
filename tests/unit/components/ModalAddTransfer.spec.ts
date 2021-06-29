import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ModalAddTransfer from "../../../src/ui/components/ModalAddTransfer.vue";
import i18n from "../../../src/service/i18n";

describe("ModalAddTransfer.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", async (): Promise<void> => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAddTransfer, {
            localVue,
            i18n,
            propsData: { state: { isOpen: true } },
            listeners: { change: onChange }
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const modal = wrapper.vm.$children.find(
            child => child.$options.name === "Modal"
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        modal!.showModal();
        // eslint-disable-next-line no-await-in-loop
        for (let i = 0; i < 10; i++) await localVue.nextTick();

        expect(wrapper).toMatchInlineSnapshot(`
            <transition-stub name="fade">
              <div role="dialog" aria-modal="true" class="modal-background">
                <transition-stub name="slidefade">
                  <div class="modal">
                    <header><span class="title">Add Transfer</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <!---->
                    <div class="main">
                      <div class="content-container">
                        <form>
                          <div class="text-input input has-label" value=""><label class="label-container"><span class="label">To Account</span> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="shard.realm.account or account" type="text" autocomplete="on" spellcheck="true"> <!----></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
                      </div></span>
                      <!----></span></label>
                      <div class="actions">
                        <!---->
                        <!---->
                        <!---->
                      </div>
                      <!---->
                    </div> <br>
                    <div><span class="label">
                            Asset
                        </span>
                      <div class="asset-input input">
                        <div class="select select">
                          <div class="select-value-container">
                            <div class="select-value">
                              Hbar
                            </div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                            </svg>
                          </div>
                          <div class="select-menu">
                            <div class="select-option">
                              Hbar
                            </div>
                          </div>
                        </div>
                        <div class="text-input input is-compact" has-input=""><label class="label-container">
                            <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input type="text" autocomplete="on" spellcheck="true"> <!----></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
                      </div>
                      </span>
                      <!----></span></label>
                      <!---->
                      <!---->
                    </div>
                  </div>
              </div> <br> <br> <button type="submit" class="">
                <!----> <span>Add</span>
                <!---->
              </button></form>
              </div>
              </div>
              </div>
            </transition-stub>
            </div>
            </transition-stub>
        `);
    });
});
