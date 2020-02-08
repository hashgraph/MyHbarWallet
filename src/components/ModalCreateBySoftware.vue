<template>
  <Modal
    :is-open="isOpen"
    :title="$t('modalCreateBySoftware.title')"
    @change="this.$listeners.change"
  >
    <template>
      <form
        class="modal-access-by-software"
        @submit.prevent="$emit('submit', state.optionSelected)"
      >
        <RadioButtonGroup
          v-model="state.optionSelected"
          :options="options"
          name="software-access-option"
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
import { createComponent, reactive, watch } from "@vue/composition-api";

import imagePhrase from "../assets/button-phrase.svg";
import imageFile from "../assets/button-file.svg";

import Button from "./Button.vue";
import CustomerSupportLink from "./CustomerSupportLink.vue";
import Modal from "./Modal.vue";
import PurchaseWalletLink from "./PurchaseWalletLink.vue";
import RadioButtonGroup from "./RadioButtonGroup.vue";
import Warning from "./Warning.vue";

export enum CreateSoftwareOption {
    File = "file",
    Phrase = "phrase"
}

interface State {
    optionSelected: CreateSoftwareOption | null;
}

export default createComponent({
    name: "ModalCreateBySoftware",
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
    props: { isOpen: Boolean },
    setup(props: { isOpen: boolean }) {
        const state = reactive<State>({ optionSelected: null });

        const options = [
            {
                label: "Keystore File",
                value: CreateSoftwareOption.File,
                image: imageFile
            },
            {
                label: "Mnemonic Phrase",
                value: CreateSoftwareOption.Phrase,
                image: imagePhrase
            }
        ];

        watch(
            () => props.isOpen,
            (newVal: boolean) => {
                if (newVal) {
                    state.optionSelected = null;
                }
            }
        );

        return {
            state,
            options
        };
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
