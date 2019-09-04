import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalAccessByPhrase from "../../src/components/ModalAccessByPhrase.vue";

describe("ModalAccessByPhrase.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const onChange = jest.fn();
        const wrapper = shallowMount(ModalAccessByPhrase, {
            localVue,
            propsData: {
                state: {
                    modalIsOpen: false,
                    words: [
                        "skull",
                        "emerge",
                        "cinnamon",
                        "else",
                        "retire",
                        "zero",
                        "fatigue",
                        "enact",
                        "tank",
                        "caution",
                        "skirt",
                        "debate",
                        "become",
                        "ocean",
                        "copper",
                        "engage",
                        "coast",
                        "legal",
                        "boat",
                        "page",
                        "laundry",
                        "claw",
                        "legal",
                        "coast"
                    ],
                    isBusy: false,
                    isValid: false
                }
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="mnemonic-phrase">
              <modal-stub title="Access by Mnemonic Phrase">
                <div class="instruction">
                  Please type in your mnemonic phrase
                </div>
                <form>
                  <mnemonicinput-stub editable="true" words="24" value="skull,emerge,cinnamon,else,retire,zero,fatigue,enact,tank,caution,skirt,debate,become,ocean,copper,engage,coast,legal,boat,page,laundry,claw,legal,coast" class="phrase-input"></mnemonicinput-stub>
                  <button-stub label="Continue" class="continue-btn"></button-stub>
                </form>
                <div class="support">
                  <customersupportlink-stub></customersupportlink-stub>
                </div>
              </modal-stub>
            </div>
        `);
    });
});
