<template>
  <div class="modal-create-by-mnemonic-phrase">
    <Modal
      :is-open="isOpen"
      :title="$t('modalCreateByPhrase.title')"
      @change="this.$listeners.change"
    >
      <template v-slot:banner>
        <Warning
          :message="
            $t('warning.thisIsNotARecommendedWayToAccessYourWallet')
          "
          :title="$t('warning.title')"
        />
      </template>
      <div class="password-info-header-wrapper">
        <div class="password-info-header">
          {{ $t("common.password.yourPassword") }}
          <InfoButton
            :message="
              $t(
                'common.password.thisPasswordEncryptsYourPrivateKey'
              )
            "
          />
        </div>
      </div>
      <div class="value-switch">
        <div class="spacer" />
        <div
          class="random-button"
          @click="randomizeMnemonic"
        >
          <MaterialDesignIcon
            :icon="cachedIcon"
            :size="16"
          />
          {{ $t("modalCreateByPhrase.random") }}
        </div>
      </div>

      <MnemonicInput
        :editable="false"
        :is-open="isOpen"
        :value="words"
        :words="24"
        class="phrase-input"
      />

      <HiddenPasswordInput
        v-if="false"
        :password-warning="$t('modalCreateByPhrase.passwordWarning')"
        :value="state.passwordValue"
        @input="handlePasswordChange"
      />

      <div class="continue-btn-container">
        <Button
          :busy="state.isBusy"
          :label="
            $t('modalCreateByPhrase.iWroteDownMyMnemonicPhrase')
          "
          class="continue-btn"
          @click="handleClick"
        />
        <ModalVerifyPhrase
          v-model="state.verifyPhraseIsOpen"
          :words="words"
          @success="handleVerifySuccess"
        />
        <img
          :src="printerIcon"
          class="printer-button"
          @click="handlePrintModal"
        >

        <ModalPhrasePrintPreview
          v-model="state.printModalIsOpen"
          :words="words"
        />
      </div>

      <div class="warning-container">
        <div
          class="do-not-forget"
          v-html="
            formatRich(
              $t(
                'modalCreateByPhrase.doNotForgetToSaveYourPassword'
              ).toString(),
              { strongClass: 'important' }
            )
          "
        />
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Ed25519PrivateKey, Mnemonic } from "@hashgraph/sdk";
import { mdiCached } from "@mdi/js";
import { computed, createComponent, onMounted, reactive, SetupContext } from "@vue/composition-api";

import { formatRich } from "../formatter";
import printIcon from "../assets/icon-printer.svg";

import Button from "./Button.vue";
import HiddenPasswordInput from "./OptionalPasswordInput.vue";
import InfoButton from "./InfoButton.vue";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import MnemonicInput from "./MnemonicInput.vue";
import Modal from "./Modal.vue";
import ModalPhrasePrintPreview from "./ModalPhrasePrintPreview.vue";
import ModalVerifyPhrase from "./ModalVerifyPhrase.vue";
import SwitchButton from "./SwitchButton.vue";
import Warning from "./Warning.vue";

interface Props {
    isOpen: boolean;
}

export default createComponent({
    components: {
        Modal,
        Warning,
        ModalPhrasePrintPreview,
        MnemonicInput,
        HiddenPasswordInput,
        SwitchButton,
        Button,
        MaterialDesignIcon,
        InfoButton,
        ModalVerifyPhrase
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: { isOpen: Boolean },
    setup(props: Props, context: SetupContext) {
        const numberWords = 24;
        const state = reactive({
            isBusy: false,
            passwordValue: "",
            result: null as Mnemonic | null,
            printModalIsOpen: false,
            verifyPhraseIsOpen: false
        });

        const words = computed(() => state.result ? state.result.words : []);

        const cachedIcon = computed(() => mdiCached);
        const printerIcon = computed(() => printIcon);

        function handlePasswordChange(password: string): void {
            state.passwordValue = password;
        }

        function handlePrintModal(): void {
            state.printModalIsOpen = !state.printModalIsOpen;
        }

        function handleClick(): void {
            state.verifyPhraseIsOpen = true;
        }

        // eslint-disable-next-line require-await
        async function randomizeMnemonic(): Promise<void> {
            state.result = Mnemonic.generate();
        }

        async function handleVerifySuccess(): Promise<void> {
            if (state.result == null) return;

            state.isBusy = true;
            state.verifyPhraseIsOpen = false;

            const key: Ed25519PrivateKey = await Ed25519PrivateKey.fromMnemonic(
                state.result,
                ""
            );

            // eslint-disable-next-line require-atomic-updates
            state.isBusy = false;

            context.emit("submit", key);
        }

        onMounted(() => {
            randomizeMnemonic();
        });

        return {
            state,
            numberWords,
            words,
            cachedIcon,
            printerIcon,
            handlePrintModal,
            handlePasswordChange,
            handleClick,
            randomizeMnemonic,
            handleVerifySuccess,
            formatRich
        };
    }
});
</script>

<style lang="postcss" scoped>
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
        flex-grow: 1;
    }

    .continue-btn-container {
        align-items: center;
        display: flex;
        flex-direction: row;
        margin-block-end: 20px;
    }

    .password-info-header-wrapper {
        display: flex;
        justify-content: space-around;
    }

    .password-info-header {
        display: inline;
        font-size: 20px;
        font-weight: 500;
        padding-block-end: 40px;
    }

    .spacer {
        flex-grow: 1;
    }

    .random-button {
        color: var(--color-melbourne-cup);
        cursor: pointer;
        font-size: 14px;
        user-select: none;
    }

    .printer-button {
        cursor: pointer;
        height: 30px;
        margin-inline-start: 20px;
    }

    .do-not-forget {
        color: var(--color-china-blue);
        font-size: 14px;
        margin-inline: auto;

        & >>> .important {
            color: var(--color-lightish-red);
            font-weight: 500;
        }
    }

    .warning-container {
        display: flex;
        flex-flow: row nowrap;
    }
</style>
