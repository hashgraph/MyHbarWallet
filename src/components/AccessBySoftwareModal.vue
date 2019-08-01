<template>
    <Modal is-open title="Access by Software">
        <div class="AccessBySoftwareModal">
            <RadioButtonGroup
                v-model="selected"
                :name="name"
                :options="options"
            />
            <div class="hardware-link">
                Purchase a hardware wallet for the highest security when
                accessing your crypto.
                <a href="" class="green-link"
                    >Purchase a hardware wallet....
                </a>
            </div>
            <div class="expanded"><Button label="Continue" /></div>
            <CustomerSupportLink />
        </div>
    </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Button from "../components/Button.vue";
import RadioButtonGroup from "../components/RadioButtonGroup.vue";
import imageKey from "../assets/button-key.svg";
import imagePhrase from "../assets/button-phrase.svg";
import imageFile from "../assets/button-file.svg";
import Modal from "../components/Modal.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";

export default Vue.extend({
    components: {
        RadioButtonGroup,
        Button,
        Modal,
        CustomerSupportLink
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
.AccessBySoftwareModal {
    padding: 20px;
}

.hardware-link {
    display: flex;
    flex-direction: column;
    padding: 20px;
    text-align: center;
}

.expanded {
    display: flex;
    padding-block-end: 20px;
}

.green-link {
    color: var(--color-melbourne-cup);
    text-decoration: none;
}

.green-link:hover,
.green-link:focus {
    text-decoration: underline;
}
</style>
