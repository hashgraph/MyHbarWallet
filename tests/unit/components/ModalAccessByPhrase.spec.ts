import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalAccessByPhrase from "../../../src/components/ModalAccessByPhrase.vue";
import i18n from "../../../src/i18n";
import VueI18n from "vue-i18n";

describe("ModalAccessByPhrase.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders not busy, not valid", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByPhrase, {
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
              <!---->
            </div>
        `);
    });

    it("renders not busy, valid", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByPhrase, {
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
              <!---->
            </div>
        `);
    });

    it("renders busy, not valid", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByPhrase, {
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
              <!---->
            </div>
        `);
    });

    it("renders busy, valid", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalAccessByPhrase, {
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
              <!---->
            </div>
        `);
    });
});
