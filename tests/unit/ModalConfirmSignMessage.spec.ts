import VueCompositionApi from "@vue/composition-api";
import ModalConfirmSignMessage from "../../src/components/ModalConfirmSignMessage.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";

describe("ModalConfirmSignMessage.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const onChange = jest.fn();
        const wrapper = shallowMount(ModalConfirmSignMessage, {
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
            <modal-stub title="Confirmation" large="true">
              <p class="title">Signing Key</p>
              <div class="item account"><img src="https://api.adorable.io/avatars/285/dec80229a4a416d552f99c9e9b772ff1061b736ade30bf93abdae260b0975f29" class="account-image"> <span class="account-key"> dec80229a4a416d552f99c9e9b772ff1061b736ade30bf93abdae260b0975f29 </span></div>
              <p class="title">Message</p>
              <readonlyinput-stub value="message" class="item"></readonlyinput-stub>
              <p class="title">Message in hex</p>
              <readonlyinput-stub value="0x6d657373616765" class="item"></readonlyinput-stub>
              <div class="center">
                <button-stub label="Confirm Signing"></button-stub>
              </div>
            </modal-stub>
        `);
    });
});
