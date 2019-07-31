<template>
    <div class="SoftwareWalletButtonGroup">
        <RadioButtonGroup v-model="selected" :name="name" :options="options" />
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
            selected: "file",
            name: "software-wallet-radio"
        };
    },
    computed: {
        options() {
            return [
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
        }
    }
});
</script>

<style lang="postcss" scoped>
.SoftwareWalletButtonGroup {
    padding: 20px;
}
</style>
