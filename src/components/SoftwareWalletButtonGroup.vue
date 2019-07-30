<template>
    <div class="SoftwareWalletButtonGroup">
        <RadioButtonGroup :name="name" :options="options" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import RadioButtonGroup from "../components/RadioButtonGroup.vue";
import imageKey from "../assets/button-key.svg";
import imagePhrase from "../assets/button-phrase.svg";
import imageFile from "../assets/button-file.svg";

export default Vue.extend({
    components: {
        RadioButtonGroup
    },
    data() {
        return {
            selected: "",
            name: "software-wallet-radio",
            options: [
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
            ]
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

<style lang="postcss" scoped>
.SoftwareWalletButtonGroup {
    padding: 20px;
}
</style>
