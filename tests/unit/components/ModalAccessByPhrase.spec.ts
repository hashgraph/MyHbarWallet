import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ModalAccessByPhrase from "../../../src/components/ModalAccessByPhrase.vue";
import i18n from "../../../src/i18n";

describe("ModalAccessByPhrase.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders not busy, not valid", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = shallowMount(ModalAccessByPhrase, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: false,
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
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-mnemonic-phrase">
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

    it("renders not busy, valid", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = shallowMount(ModalAccessByPhrase, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: false,
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
                    isValid: true
                }
            },
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-mnemonic-phrase">
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

    it("renders busy, not valid", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = shallowMount(ModalAccessByPhrase, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: false,
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
                    isBusy: true,
                    isValid: false
                }
            },
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-mnemonic-phrase">
              <modal-stub notclosable="true" title="Access by Mnemonic Phrase">
                <div class="instruction">
                  Please type in your mnemonic phrase
                </div>
                <form>
                  <mnemonicinput-stub editable="true" words="24" value="skull,emerge,cinnamon,else,retire,zero,fatigue,enact,tank,caution,skirt,debate,become,ocean,copper,engage,coast,legal,boat,page,laundry,claw,legal,coast" class="phrase-input"></mnemonicinput-stub>
                  <button-stub label="Continue" busy="true" class="continue-btn"></button-stub>
                </form>
                <div class="support">
                  <customersupportlink-stub></customersupportlink-stub>
                </div>
              </modal-stub>
            </div>
        `);
    });

    it("renders busy, valid", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = shallowMount(ModalAccessByPhrase, {
            localVue,
            i18n,
            propsData: {
                state: {
                    isOpen: false,
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
                    isBusy: true,
                    isValid: true
                }
            },
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-mnemonic-phrase">
              <modal-stub notclosable="true" title="Access by Mnemonic Phrase">
                <div class="instruction">
                  Please type in your mnemonic phrase
                </div>
                <form>
                  <mnemonicinput-stub editable="true" words="24" value="skull,emerge,cinnamon,else,retire,zero,fatigue,enact,tank,caution,skirt,debate,become,ocean,copper,engage,coast,legal,boat,page,laundry,claw,legal,coast" class="phrase-input"></mnemonicinput-stub>
                  <button-stub label="Continue" busy="true" class="continue-btn"></button-stub>
                </form>
                <div class="support">
                  <customersupportlink-stub></customersupportlink-stub>
                </div>
              </modal-stub>
            </div>
        `);
    });
});
