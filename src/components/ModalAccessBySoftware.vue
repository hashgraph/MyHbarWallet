<template>
    <Modal
        :is-open="isOpen"
        title="Access by Software"
        @change="this.$listeners.change"
    >
        <template v-slot:banner>
            <Warning />
        </template>
        <template>
            <form
                class="modal-access-by-software"
                @submit.prevent="handleSubmit"
            >
                <RadioButtonGroup
                    v-model="state.optionSelected"
                    name="software-access-option"
                    :options="options"
                />
                <div class="hardware-link">
                    <div>
                        Purchase a hardware wallet for the highest security when
                        accessing your crypto.
                    </div>
                    <router-link :to="{ name: 'hardware-wallet-affiliates' }">
                        Purchase a hardware wallet....
                    </router-link>
                </div>
                <Button
                    :disabled="state.optionSelected == null"
                    label="Continue"
                />
                <CustomerSupportLink class="support-link" />
            </form>
        </template>
    </Modal>
</template>

<script lang="ts">
import Button from "../components/Button.vue";
import RadioButtonGroup from "../components/RadioButtonGroup.vue";
import imageKey from "../assets/button-key.svg";
import imagePhrase from "../assets/button-phrase.svg";
import imageFile from "../assets/button-file.svg";
import Modal from "../components/Modal.vue";
import Warning from "../components/Warning.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";
import { createComponent, reactive } from "@vue/composition-api";

export enum AccessSoftwareOption {
    File = "file",
    Phrase = "phrase",
    Key = "key"
}

export default createComponent({
    components: {
        RadioButtonGroup,
        Button,
        Modal,
        CustomerSupportLink,
        Warning
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: { type: Boolean }
    },
    setup(props, context) {
        const state = reactive({
            optionSelected: null
        });

        const options = [
            {
                label: "Keystore File",
                value: AccessSoftwareOption.File,
                image: imageFile
            },
            {
                label: "Mnemonic Phrase",
                value: AccessSoftwareOption.Phrase,
                image: imagePhrase
            },
            {
                label: "Private Key",
                value: AccessSoftwareOption.Key,
                image: imageKey
            }
        ];

        function handleSubmit() {
            context.emit("submit", state.optionSelected);
        }

        return { state, options, handleSubmit };
    }
});
</script>

<style lang="postcss" scoped>
.modal-access-by-software {
    align-items: stretch;
    display: flex;
    flex-direction: column;
}

.hardware-link {
    color: var(--color-china-blue);
    font-size: 14px;
    padding: 20px;
    text-align: center;
}

a {
    color: var(--color-melbourne-cup);
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
}

.support-link {
    margin-block-start: 20px;
}
</style>
