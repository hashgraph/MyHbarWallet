<template>
  <div class="modal-mnemonic-phrase">
    <Modal
      :is-open="state.isOpen"
      :not-closable="state.isBusy"
      :title="$t('modalAccessByPhrase.title')"
      @change="handleModalChangeIsOpen"
    >
      <template v-slot:banner>
        <Warning
          :message="
            $t('warning.thisIsNotARecommendedWayToAccessYourWallet')
          "
          :title="$t('warning.title')"
        />
      </template>

      <div class="instruction">
        {{ $t("modalAccessByPhrase.pleaseTypeInYourMnemonicPhrase") }}
      </div>
      <form @submit.prevent="$emit('submit')">
        <MnemonicInput
          :editable="true"
          :is-open="state.isOpen"
          :value="state.words"
          :words="24"
          class="phrase-input"
          @input="handleMnemonicInput"
        />

        <Button
          :busy="state.isBusy"
          :disabled="!areFieldsFilled"
          :label="$t('common.continue')"
          class="continue-btn"
        />
      </form>
      <div class="support">
        <CustomerSupportLink />
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, createComponent, PropType, SetupContext, watch } from "@vue/composition-api";

import Modal from "../components/Modal.vue";
import SwitchButton from "../components/SwitchButton.vue";
import MnemonicInput from "../components/MnemonicInput.vue";
import Button from "../components/Button.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";
import Warning from "../components/Warning.vue";

export interface State {
    isOpen: boolean;
    words: string[];
    isBusy: boolean;
    isValid: boolean;
}

export default createComponent({
    name: "ModalAccessByPhrase",
    components: {
        Modal,
        MnemonicInput,
        SwitchButton,
        Button,
        CustomerSupportLink,
        Warning
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: { state: Object as PropType<State> },
    setup(props: { state: State }, context: SetupContext) {
        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, isOpen });
        }

        function handleMnemonicInput(words: string[]): void {
            context.emit("change", { ...props.state, words });
        }

        const areFieldsFilled = computed((): boolean => {
            if (props.state.words.length === 24) {
                for (const word of props.state.words) {
                    if (!word || word.length === 0) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        });

        // Watch for the modal state to change, and clear input when the modal is reopened
        watch(
            () => props.state.isOpen,
            (newVal: boolean) => {
                if (newVal) {
                    context.emit("change", { ...props.state, words: []});
                }
            }
        );

        return {
            handleModalChangeIsOpen,
            handleMnemonicInput,
            areFieldsFilled
        };
    }
});
</script>

<style lang="postcss" scoped>
    .instruction {
        color: var(--color-china-blue);
        font-size: 14px;
        margin-block-end: 20px;
    }

    .value-switch {
        align-items: center;
        display: flex;
        margin-block-end: 10px;

        & > .btn {
            margin-inline-end: 10px;
        }

        & > .text {
            color: var(--color-boathouse);
            font-size: 14px;
        }
    }

    .phrase-input {
        margin-block-end: 40px;
    }

    .continue-btn {
        margin-block-end: 20px;
        width: 100%;
    }

    .support {
        align-items: center;
        display: flex;
        font-size: 14px;
        justify-content: space-around;
    }
</style>
