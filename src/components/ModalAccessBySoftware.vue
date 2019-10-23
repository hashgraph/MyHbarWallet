<template>
    <div class="modal-access-by-software">
        <Modal
            :is-open="isOpen"
            :title="$t('modalAccessBySoftware.title')"
            @change="this.$listeners.change"
        >
            <template v-slot:banner>
                <Warning which-modal="software" />
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
                    <PurchaseWalletLink></PurchaseWalletLink>
                    <Button
                        :disabled="state.optionSelected == null"
                        :label="$t('common.continue')"
                    />
                    <CustomerSupportLink class="support-link" />
                </form>
            </template>
        </Modal>
    </div>
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
import PurchaseWalletLink from "../components/PurchaseWalletLink.vue";
import {
    createComponent,
    reactive,
    watch,
    SetupContext
} from "@vue/composition-api";

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
        Warning,
        PurchaseWalletLink
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: { type: Boolean }
    },
    setup(props: { isOpen: boolean }, context: SetupContext) {
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
