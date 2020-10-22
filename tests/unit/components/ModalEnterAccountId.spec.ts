import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ModalEnterAccountId from "../../../src/ui/components/ModalEnterAccountId.vue";
import i18n from "../../../src/service/i18n";

describe("ModalEnterAccountId.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders open, not busy, no error", async (): Promise<void> => {
        expect.assertions(2);

        const state = {
            isOpen: true,
            isBusy: false,
            account: "",
            errorMessage: null
        };
        const onChange = jest.fn();
        const wrapper = mount(ModalEnterAccountId, {
            localVue,
            i18n,
            propsData: { state },
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
        await localVue.nextTick();

        expect(onChange).toHaveBeenCalledTimes(0);
        expect(wrapper).toMatchInlineSnapshot(`
            <transition-stub name="fade">
              <div role="dialog" aria-modal="true" class="modal-background">
                <transition-stub name="slidefade">
                  <div class="modal medium">
                    <header><span class="title">Enter Account ID</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <!---->
                    <div class="main">
                      <div class="content-container">
                        <form>
                          <!---->
                          <div class="container">
                            <div class="subtitle">Network</div>
                            <div class="network-selector">
                              <div class="select select">
                                <div class="select-value-container">
                                  <div class="select-value">
                                    Hedera™ Hashgraph Main Network
                                  </div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                                  </svg>
                                </div>
                                <div class="select-menu">
                                  <div class="select-option">
                                    Hedera™ Hashgraph Main Network
                                  </div>
                                  <div class="select-option">
                                    Hedera™ Hashgraph Test Network
                                  </div>
                                  <div class="select-option">
                                    Hedera™ Hashgraph Preview Network
                                  </div>
                                  <div class="select-option">
                                    Custom Network
                                  </div>
                                </div>
                              </div>
                              <div class="details">
                                <div class="notice notice">
                                  <div class="symbol-container compact"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                                      <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
                                    </svg></div>
                                  <div class="text">
                                    <!---->
                                    <div class="message">
                                      Your custom network must support gRPC web
                                    </div>
                                  </div>
                                </div>
                                <div class="notice-box">
                                  <div class="text-input input" show-validation="" value=""><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Node ID" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
                                </div></span>
                                <!----></span></label>
                                <!---->
                                <!---->
                              </div>
                              <div class="text-input input"><label class="label-container">
                                  <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Node Address" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
                            </div></span>
                            <!----></span></label>
                            <!---->
                            <!---->
                          </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="container">
                <div class="subtitle">Account ID</div>
                <div class="text-input"><label class="label-container">
                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="shard.realm.account or account" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
              </div></span>
              <!----></span></label>
              <!---->
              <!---->
              </div>
              </div>
              <div class="buttons"><button type="button" class="button outline compact">
                  <!----> <span>No Account ID?</span>
                  <!---->
                </button> <button type="submit" disabled="disabled" class="button compact">
                  <!----> <span>Continue</span>
                  <!---->
                </button></div>
              </form>
              </div>
              </div>
              </div>
            </transition-stub>
            </div>
            </transition-stub>
        `);
    });

    it("renders open, busy, no error", async (): Promise<void> => {
        expect.assertions(1);

        const state = {
            isOpen: true,
            isBusy: true,
            account: "",
            errorMessage: null
        };
        const onChange = jest.fn();
        const wrapper = mount(ModalEnterAccountId, {
            localVue,
            i18n,
            propsData: { state },
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
        await localVue.nextTick();

        expect(wrapper).toMatchInlineSnapshot(`
            <transition-stub name="fade">
              <div role="dialog" aria-modal="true" class="modal-background">
                <transition-stub name="slidefade">
                  <div class="modal medium">
                    <header><span class="title">Enter Account ID</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <!---->
                    <div class="main">
                      <div class="content-container">
                        <form>
                          <!---->
                          <div class="container">
                            <div class="subtitle">Network</div>
                            <div class="network-selector">
                              <div class="select select">
                                <div class="select-value-container">
                                  <div class="select-value">
                                    Hedera™ Hashgraph Main Network
                                  </div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                                  </svg>
                                </div>
                                <div class="select-menu">
                                  <div class="select-option">
                                    Hedera™ Hashgraph Main Network
                                  </div>
                                  <div class="select-option">
                                    Hedera™ Hashgraph Test Network
                                  </div>
                                  <div class="select-option">
                                    Hedera™ Hashgraph Preview Network
                                  </div>
                                  <div class="select-option">
                                    Custom Network
                                  </div>
                                </div>
                              </div>
                              <div class="details">
                                <div class="notice notice">
                                  <div class="symbol-container compact"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                                      <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
                                    </svg></div>
                                  <div class="text">
                                    <!---->
                                    <div class="message">
                                      Your custom network must support gRPC web
                                    </div>
                                  </div>
                                </div>
                                <div class="notice-box">
                                  <div class="text-input input" show-validation="" value=""><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Node ID" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
                                </div></span>
                                <!----></span></label>
                                <!---->
                                <!---->
                              </div>
                              <div class="text-input input"><label class="label-container">
                                  <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Node Address" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
                            </div></span>
                            <!----></span></label>
                            <!---->
                            <!---->
                          </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="container">
                <div class="subtitle">Account ID</div>
                <div class="text-input" disabled="disabled"><label class="label-container">
                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="shard.realm.account or account" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
              </div></span>
              <!----></span></label>
              <!---->
              <!---->
              </div>
              </div>
              <div class="buttons"><button type="button" class="button outline compact">
                  <!----> <span>No Account ID?</span>
                  <!---->
                </button> <button type="submit" disabled="disabled" class="button busy compact"><svg width="24" height="24" viewBox="0 0 24 24" class="spinner mdi-spin">
                    <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
                  </svg>
                  <!---->
                  <!---->
                </button></div>
              </form>
              </div>
              </div>
              </div>
            </transition-stub>
            </div>
            </transition-stub>
        `);
    });

    it("renders open, not busy, error", async (): Promise<void> => {
        expect.assertions(1);

        const state = {
            isOpen: true,
            isBusy: false,
            account: "",
            errorMessage: "Error Message"
        };
        const onChange = jest.fn();
        const wrapper = mount(ModalEnterAccountId, {
            localVue,
            i18n,
            propsData: { state },
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
        await localVue.nextTick();

        expect(wrapper).toMatchInlineSnapshot(`
            <transition-stub name="fade">
              <div role="dialog" aria-modal="true" class="modal-background">
                <transition-stub name="slidefade">
                  <div class="modal medium">
                    <header><span class="title">Enter Account ID</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <!---->
                    <div class="main">
                      <div class="content-container">
                        <form>
                          <!---->
                          <div class="container">
                            <div class="subtitle">Network</div>
                            <div class="network-selector">
                              <div class="select select">
                                <div class="select-value-container">
                                  <div class="select-value">
                                    Hedera™ Hashgraph Main Network
                                  </div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                                  </svg>
                                </div>
                                <div class="select-menu">
                                  <div class="select-option">
                                    Hedera™ Hashgraph Main Network
                                  </div>
                                  <div class="select-option">
                                    Hedera™ Hashgraph Test Network
                                  </div>
                                  <div class="select-option">
                                    Hedera™ Hashgraph Preview Network
                                  </div>
                                  <div class="select-option">
                                    Custom Network
                                  </div>
                                </div>
                              </div>
                              <div class="details">
                                <div class="notice notice">
                                  <div class="symbol-container compact"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                                      <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
                                    </svg></div>
                                  <div class="text">
                                    <!---->
                                    <div class="message">
                                      Your custom network must support gRPC web
                                    </div>
                                  </div>
                                </div>
                                <div class="notice-box">
                                  <div class="text-input input" show-validation="" value=""><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Node ID" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
                                </div></span>
                                <!----></span></label>
                                <!---->
                                <!---->
                              </div>
                              <div class="text-input input"><label class="label-container">
                                  <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Node Address" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
                            </div></span>
                            <!----></span></label>
                            <!---->
                            <!---->
                          </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="container">
                <div class="subtitle">Account ID</div>
                <div class="text-input has-error"><label class="label-container">
                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="shard.realm.account or account" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
              </div></span>
              <!----></span></label>
              <!---->
              <div class="error">
                Error Message
              </div>
              </div>
              </div>
              <div class="buttons"><button type="button" class="button outline compact">
                  <!----> <span>No Account ID?</span>
                  <!---->
                </button> <button type="submit" disabled="disabled" class="button compact">
                  <!----> <span>Continue</span>
                  <!---->
                </button></div>
              </form>
              </div>
              </div>
              </div>
            </transition-stub>
            </div>
            </transition-stub>
        `);
    });

    it("renders open, busy, error", async (): Promise<void> => {
        expect.assertions(1);

        const state = {
            isOpen: true,
            isBusy: true,
            account: "",
            errorMessage: "Error Message"
        };
        const onChange = jest.fn();
        const wrapper = mount(ModalEnterAccountId, {
            localVue,
            i18n,
            propsData: { state },
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
        await localVue.nextTick();

        expect(wrapper).toMatchInlineSnapshot(`
            <transition-stub name="fade">
              <div role="dialog" aria-modal="true" class="modal-background">
                <transition-stub name="slidefade">
                  <div class="modal medium">
                    <header><span class="title">Enter Account ID</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <!---->
                    <div class="main">
                      <div class="content-container">
                        <form>
                          <!---->
                          <div class="container">
                            <div class="subtitle">Network</div>
                            <div class="network-selector">
                              <div class="select select">
                                <div class="select-value-container">
                                  <div class="select-value">
                                    Hedera™ Hashgraph Main Network
                                  </div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                                  </svg>
                                </div>
                                <div class="select-menu">
                                  <div class="select-option">
                                    Hedera™ Hashgraph Main Network
                                  </div>
                                  <div class="select-option">
                                    Hedera™ Hashgraph Test Network
                                  </div>
                                  <div class="select-option">
                                    Hedera™ Hashgraph Preview Network
                                  </div>
                                  <div class="select-option">
                                    Custom Network
                                  </div>
                                </div>
                              </div>
                              <div class="details">
                                <div class="notice notice">
                                  <div class="symbol-container compact"><svg width="24" height="24" viewBox="0 0 24 24" class="symbol">
                                      <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
                                    </svg></div>
                                  <div class="text">
                                    <!---->
                                    <div class="message">
                                      Your custom network must support gRPC web
                                    </div>
                                  </div>
                                </div>
                                <div class="notice-box">
                                  <div class="text-input input" show-validation="" value=""><label class="label-container">
                                      <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Node ID" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
                                </div></span>
                                <!----></span></label>
                                <!---->
                                <!---->
                              </div>
                              <div class="text-input input"><label class="label-container">
                                  <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Node Address" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
                            </div></span>
                            <!----></span></label>
                            <!---->
                            <!---->
                          </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="container">
                <div class="subtitle">Account ID</div>
                <div class="text-input has-error" disabled="disabled"><label class="label-container">
                    <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="shard.realm.account or account" type="text" autocomplete="on" spellcheck="true"></div> <div class="deco-flex-item"><span class="decorations"><svg width="24" height="24" viewBox="0 0 24 24" class="checkmark"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path></svg></span></div>
              </div></span>
              <!----></span></label>
              <!---->
              <div class="error">
                Error Message
              </div>
              </div>
              </div>
              <div class="buttons"><button type="button" class="button outline compact">
                  <!----> <span>No Account ID?</span>
                  <!---->
                </button> <button type="submit" disabled="disabled" class="button busy compact"><svg width="24" height="24" viewBox="0 0 24 24" class="spinner mdi-spin">
                    <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
                  </svg>
                  <!---->
                  <!---->
                </button></div>
              </form>
              </div>
              </div>
              </div>
            </transition-stub>
            </div>
            </transition-stub>
        `);
    });
});
