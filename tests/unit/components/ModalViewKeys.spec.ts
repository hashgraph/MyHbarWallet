import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ModalViewKeys from "../../../src/components/ModalViewKeys.vue";
import i18n from "../../../src/i18n";

describe("ModalViewKeys.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    const fakePrivateKey =
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
    const fakePublicKey =
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

    it("renders open", (): void => {
        expect.assertions(2);
        const onChange = jest.fn();

        const wrapper = mount(ModalViewKeys, {
            localVue,
            i18n,
            propsData: {
                isOpen: true,
                privateKey: fakePrivateKey,
                publicKey: fakePublicKey
            },
            listeners: { change: onChange }
        });

        expect(onChange).toHaveBeenCalledTimes(0);
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-view-keys">
              <div aria-modal="true" role="dialog" transition="modal-fade" class="modal-background">
                <div class="modal">
                  <header><span class="title">Your Keys</span> <svg height="24" width="24" viewBox="0 0 24 24" class="close">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                    </svg></header>
                  <!---->
                  <div class="main">
                    <div class="content-container">
                      <div class="key-container public">
                        <div class="subtitle">Public Key</div>
                        <div class="read-only-input input">
                          <div class="value multiline">
                            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                          </div>
                          <!---->
                        </div> <button type="submit" class="button compact">
                          <!----> <span>Copy Public Key</span>
                          <!----></button>
                      </div>
                      <div class="key-container private">
                        <div class="subtitle">Private Key</div>
                        <div class="read-only-input input">
                          <div class="value multiline obscure">
                            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                          </div> <svg height="40" width="40" viewBox="0 0 24 24" class="eye">
                            <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path>
                          </svg>
                        </div> <button type="submit" class="button compact">
                          <!----> <span>Copy Private Key</span>
                          <!----></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders closed", (): void => {
        expect.assertions(2);
        const onChange = jest.fn();

        const wrapper = mount(ModalViewKeys, {
            localVue,
            i18n,
            propsData: {
                isOpen: false,
                privateKey: fakePrivateKey,
                publicKey: fakePublicKey
            },
            listeners: { change: onChange }
        });

        expect(onChange).toHaveBeenCalledTimes(0);
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-view-keys">
              <!---->
            </div>
        `);
    });
});
