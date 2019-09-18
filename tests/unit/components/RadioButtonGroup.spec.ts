import { mount } from "@vue/test-utils";
import RadioButtonGroup from "../../../src/components/RadioButtonGroup.vue";
import imageKey from "../../../src/assets/button-key.svg";
import imagePhrase from "../../../src/assets/button-phrase.svg";
import imageFile from "../../../src/assets/button-file.svg";
import i18n from "../../../src/i18n";

describe("RadioButtonGroup.vue", (): void => {
    const name = "RadioButtonGroup";
    const options = [
        {
            label: "Keystore File",
            value: "file",
            image: imageFile
        },
        {
            label: "Mnemonic Phrase",
            value: "phrase",
            image: imagePhrase
        },
        {
            label: "Private Key",
            value: "key",
            image: imageKey
        }
    ];

    it("renders without options", (): void => {
        expect.assertions(1);

        const wrapper = mount(RadioButtonGroup, {
            i18n,
            propsData: {
                name,
                options: []
            }
        });

        expect(wrapper).toMatchInlineSnapshot(
            `<div class="radio-button-group"></div>`
        );
    });

    it("renders with options", (): void => {
        expect.assertions(1);

        const wrapper = mount(RadioButtonGroup, {
            i18n,
            propsData: {
                name,
                options
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="radio-button-group">
              <div><label for="file" class="radio-button"><img alt="" src="" class="icon"> <input id="file" type="radio" name="RadioButtonGroup" class="input" value="file"> <span class="label">Keystore File</span>
                  <!----></label></div>
              <div><label for="phrase" class="radio-button"><img alt="" src="" class="icon"> <input id="phrase" type="radio" name="RadioButtonGroup" class="input" value="phrase"> <span class="label">Mnemonic Phrase</span>
                  <!----></label></div>
              <div><label for="key" class="radio-button"><img alt="" src="" class="icon"> <input id="key" type="radio" name="RadioButtonGroup" class="input" value="key"> <span class="label">Private Key</span>
                  <!----></label></div>
            </div>
        `);
    });
});
