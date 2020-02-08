import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import ModalCreateByPhrase from "../../../src/components/ModalCreateByPhrase.vue";
import i18n from "../../../src/i18n";

describe("ModalCreateByPhrase.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders closed", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = shallowMount(ModalCreateByPhrase, {
            localVue,
            i18n,
            propsData: { isOpen: false },
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-create-by-mnemonic-phrase">
              <modal-stub title="Create by Mnemonic Phrase">
                <div class="password-info-header-wrapper">
                  <div class="password-info-header">
                    Your Password
                    <infobutton-stub message="This password encrypts your private key. This does not act as a seed to generate your keys."></infobutton-stub>
                  </div>
                </div>
                <div class="value-switch">
                  <div class="spacer"></div>
                  <div class="random-button">
                    <materialdesignicon-stub size="16" icon="M19,8L15,12H18A6,6 0 0,1 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20A8,8 0 0,0 20,12H23M6,12A6,6 0 0,1 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4A8,8 0 0,0 4,12H1L5,16L9,12"></materialdesignicon-stub>
                    Random
                  </div>
                </div>
                <mnemonicinput-stub words="24" value="" class="phrase-input"></mnemonicinput-stub>
                <!---->
                <div class="continue-btn-container">
                  <button-stub label="I Wrote Down My Mnemonic Phrase" class="continue-btn"></button-stub>
                  <modalverifyphrase-stub words=""></modalverifyphrase-stub> <img src="" class="printer-button">
                  <modalphraseprintpreview-stub words=""></modalphraseprintpreview-stub>
                </div>
                <div class="warning-container">
                  <div class="do-not-forget"><span class="important">DO NOT FORGET</span> to save your password. You will need this to access your wallet.</div>
                </div>
              </modal-stub>
            </div>
        `);
    });

    it("renders open", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = shallowMount(ModalCreateByPhrase, {
            localVue,
            i18n,
            propsData: { isOpen: true },
            listeners: { change: onChange }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-create-by-mnemonic-phrase">
              <modal-stub isopen="true" title="Create by Mnemonic Phrase">
                <div class="password-info-header-wrapper">
                  <div class="password-info-header">
                    Your Password
                    <infobutton-stub message="This password encrypts your private key. This does not act as a seed to generate your keys."></infobutton-stub>
                  </div>
                </div>
                <div class="value-switch">
                  <div class="spacer"></div>
                  <div class="random-button">
                    <materialdesignicon-stub size="16" icon="M19,8L15,12H18A6,6 0 0,1 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20A8,8 0 0,0 20,12H23M6,12A6,6 0 0,1 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4A8,8 0 0,0 4,12H1L5,16L9,12"></materialdesignicon-stub>
                    Random
                  </div>
                </div>
                <mnemonicinput-stub words="24" value="" isopen="true" class="phrase-input"></mnemonicinput-stub>
                <!---->
                <div class="continue-btn-container">
                  <button-stub label="I Wrote Down My Mnemonic Phrase" class="continue-btn"></button-stub>
                  <modalverifyphrase-stub words=""></modalverifyphrase-stub> <img src="" class="printer-button">
                  <modalphraseprintpreview-stub words=""></modalphraseprintpreview-stub>
                </div>
                <div class="warning-container">
                  <div class="do-not-forget"><span class="important">DO NOT FORGET</span> to save your password. You will need this to access your wallet.</div>
                </div>
              </modal-stub>
            </div>
        `);
    });
});
