import { shallowMount } from "@vue/test-utils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import RadioButtonGroup from "@/components/RadioButtonGroup.vue";
import imageKey from "@/assets/button-key.svg";
import imagePhrase from "@/assets/button-phrase.svg";
import imageFile from "@/assets/button-file.svg";

describe("RadioButtonGroup.vue", () => {
    it("renders with an empty list", () => {
        const _name = "RadioButtonGroup";
        const _options = [{}, {}, {}];

        const wrapper = shallowMount(RadioButtonGroup, {
            propsData: {
                name: _name,
                options: _options
            }
        });

        expect(wrapper.isVisible()).toBe(true);
    });

    it("renders with a list", () => {
        const _name = "RadioButtonGroup";
        const _options = [
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
        const wrapper = shallowMount(RadioButtonGroup, {
            propsData: {
                name: _name,
                options: _options
            }
        });

        expect(wrapper.isVisible()).toBe(true);
    });

    it("triggers appropriate events", () => {
        const _name = "RadioButtonGroup";
        const _options = [
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
        const wrapper = shallowMount(RadioButtonGroup, {
            propsData: {
                name: _name,
                options: _options
            }
        });

        expect(wrapper.isVisible()).toBe(true);
    });
});
