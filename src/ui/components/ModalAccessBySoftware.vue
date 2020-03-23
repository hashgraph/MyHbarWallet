<template>
    <Modal
        :is-open="isOpen"
        :title="$t('modalAccessBySoftware.title')"
        @change="this.$listeners.change"
    >
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
                <PurchaseWalletLink />
                <Button
                    :disabled="state.optionSelected == null"
                    :label="$t('common.continue')"
                />
                <CustomerSupportLink class="support-link" />
            </form>
        </template>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, watch } from "@vue/composition-api";

import imageKey from "../assets/button-key.svg";
import imagePhrase from "../assets/button-phrase.svg";
import imageFile from "../assets/button-file.svg";

import Button from "./Button.vue";
import RadioButtonGroup from "./RadioButtonGroup.vue";
import Modal from "./Modal.vue";
import Warning from "./Warning.vue";
import CustomerSupportLink from "./CustomerSupportLink.vue";
import PurchaseWalletLink from "./PurchaseWalletLink.vue";

export enum AccessSoftwareOption {
    File = "file",
    Phrase = "phrase",
    Key = "key"
}

export default defineComponent({
    components: {
        RadioButtonGroup,
        Button,
        Modal,
        CustomerSupportLink,
        Warning,
        PurchaseWalletLink
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: { isOpen: { type: Boolean }},
    setup(props: { isOpen: boolean }, context: SetupContext) {
        const state = reactive({ optionSelected: null });

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

        function handleSubmit(): void {
            context.emit("submit", state.optionSelected);
        }

        watch(
            () => props.isOpen,
            (newVal: boolean) => {
                if (newVal) {
                    state.optionSelected = null;
                }
            }
        );

        return { state, options, handleSubmit };
    }
});
</script>

<style lang="postcss" scoped>
.modal-access-by-software {
    & button {
        width: 100%;
    }
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
