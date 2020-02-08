<template>
  <div class="modal-access-by-software">
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
  </div>
</template>

<script lang="ts">
import { createComponent, reactive, SetupContext, watch } from "@vue/composition-api";

import imageFile from "../assets/button-file.svg";
import imageKey from "../assets/button-key.svg";
import imagePhrase from "../assets/button-phrase.svg";

import Button from "./Button.vue";
import CustomerSupportLink from "./CustomerSupportLink.vue";
import Modal from "./Modal.vue";
import PurchaseWalletLink from "./PurchaseWalletLink.vue";
import RadioButtonGroup from "./RadioButtonGroup.vue";
import Warning from "./Warning.vue";

export enum AccessSoftwareOption {
    File = "file",
    Phrase = "phrase",
    Key = "key"
}

export default createComponent({
    name: "ModalAccessBySoftware",
    components: {
        Button,
        CustomerSupportLink,
        Modal,
        PurchaseWalletLink,
        RadioButtonGroup,
        Warning
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
