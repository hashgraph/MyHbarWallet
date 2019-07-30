<template>
    <div style="padding: 20px;">
        <RadioButtonGroup>
            <RadioButton
                v-model="selected"
                value="file"
                name="option"
                :image="imageFile"
            >
                Keystore File
            </RadioButton>
            <RadioButton
                v-model="selected"
                value="phrase"
                name="option"
                :image="imagePhrase"
            >
                Mnemonic Phrase
            </RadioButton>
            <RadioButton
                v-model="selected"
                value="key"
                name="option"
                :image="imageKey"
            >
                Private Key
            </RadioButton>
        </RadioButtonGroup>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import RadioButton from "../components/RadioButton.vue";
import RadioButtonGroup from "../components/RadioButtonGroup.vue";
import imageKey from "../assets/button-key.svg";
import imagePhrase from "../assets/button-phrase.svg";
import imageFile from "../assets/button-file.svg";

export default Vue.extend({
    components: {
        RadioButton,
        RadioButtonGroup
    },
    data() {
        return {
            selected: ""
        };
    },
    computed: {
        imageKey() {
            return imageKey;
        },
        imagePhrase() {
            return imagePhrase;
        },
        imageFile() {
            return imageFile;
        }
    }
});
</script>
