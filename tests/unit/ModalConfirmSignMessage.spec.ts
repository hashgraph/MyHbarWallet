import VueCompositionApi from "@vue/composition-api";
import ModalConfirmSignMessage from "../../src/components/ModalConfirmSignMessage.vue";
import { createLocalVue, mount } from "@vue/test-utils";

describe("ModalConfirmSignMessage.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const onChange = jest.fn();
        const wrapper = mount(ModalConfirmSignMessage, {
            localVue,
            propsData: {
                isOpen: false,
                message: "message",
                publicKey:
                    "302a300506032b6570032100dec80229a4a416d552f99c9e9b772ff1061b736ade30bf93abdae260b0975f29"
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div role="dialog" aria-modal="true" class="modal-background">
              <div class="modal large">
                <header><span class="title">Confirmation</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                  </svg></header>
                <div class="main">
                  <div class="content-container">
                    <p class="title">Signing Key</p>
                    <div class="item account"><img src="https://api.adorable.io/avatars/285/dec80229a4a416d552f99c9e9b772ff1061b736ade30bf93abdae260b0975f29" class="account-image"> <span class="account-key"> dec80229a4a416d552f99c9e9b772ff1061b736ade30bf93abdae260b0975f29 </span></div>
                    <p class="title">Message</p>
                    <div class="read-only-input item">
                      <div class="value">message</div>
                    </div>
                    <p class="title">Message in hex</p>
                    <div class="read-only-input item">
                      <div class="value">0x6d657373616765</div>
                    </div>
                    <div class="center"><button type="submit" class=""><span>Confirm Signing</span>
                        <!----></button></div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
