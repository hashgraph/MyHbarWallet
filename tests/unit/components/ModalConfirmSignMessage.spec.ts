import VueCompositionApi from "@vue/composition-api";
import { createLocalVue, mount } from "@vue/test-utils";
import VueI18n from "vue-i18n";

import ModalConfirmSignMessage from "../../../src/ui/components/ModalConfirmSignMessage.vue";
import i18n from "../../../src/service/i18n";

describe("ModalConfirmSignMessage.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    const PUBLIC_KEY =
        "302a300506032b6570032100dec80229a4a416d552f99c9e9b772ff1061b736ade30bf93abdae260b0975f29";

    it("renders open", async (): Promise<void> => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalConfirmSignMessage, {
            localVue,
            i18n,
            propsData: {
                isOpen: true,
                message: "message",
                publicKey: PUBLIC_KEY
            },
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
                  <div class="modal large">
                    <header><span class="title">Confirmation</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                      </svg></header>
                    <!---->
                    <div class="main">
                      <div class="content-container">
                        <p class="title">
                          Signing Key
                        </p>
                        <div class="item account"><img src="https://api.adorable.io/avatars/285/302a300506032b6570032100dec80229a4a416d552f99c9e9b772ff1061b736ade30bf93abdae260b0975f29" class="account-image"> <span class="account-key"> 302a300506032b6570032100dec80229a4a416d552f99c9e9b772ff1061b736ade30bf93abdae260b0975f29 </span></div>
                        <p class="title">
                          Message
                        </p>
                        <div class="read-only-input item">
                          <div class="value">
                            message
                          </div>
                          <!---->
                        </div>
                        <p class="title">
                          Message in hex
                        </p>
                        <div class="read-only-input item">
                          <div class="value">
                            0x6d657373616765
                          </div>
                          <!---->
                        </div>
                        <div class="center"><button type="submit" class="">
                            <!----> <span>Confirm Signing</span>
                            <!----></button></div>
                      </div>
                    </div>
                  </div>
                </transition-stub>
              </div>
            </transition-stub>
        `);
    });
});
