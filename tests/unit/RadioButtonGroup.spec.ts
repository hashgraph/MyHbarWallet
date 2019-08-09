import { shallowMount, mount } from "@vue/test-utils";
import RadioButtonGroup from "@/components/RadioButtonGroup.vue";
import imageKey from "@/assets/button-key.svg";
import imagePhrase from "@/assets/button-phrase.svg";
import imageFile from "@/assets/button-file.svg";
import RadioButton from "@/components/RadioButton.vue";

describe("RadioButtonGroup.vue", () => {
    it("renders with a list", () => {
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
        const wrapper = shallowMount(RadioButtonGroup, {
            propsData: {
                name,
                options
            }
        });

        expect(wrapper.findAll(RadioButton)).toHaveLength(3);
    });

    it("triggers appropriate events", () => {
        const name = "RadioButtonGroup";
        const emission = { change: [["key"]] };

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
        const wrapper = mount(RadioButtonGroup, {
            propsData: {
                name,
                options
            }
        });

        expect(wrapper.findAll("input[type=radio]")).toHaveLength(3);
        wrapper.find("input[value=key]").setChecked(true);
        expect(wrapper.emitted()).toEqual(emission);
    });
});
