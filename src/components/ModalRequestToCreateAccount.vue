<template>
  <div class="modal-request-to-create-account">
    <Modal
      :is-open="isOpen"
      :large="false"
      :title="$t('modalRequestToCreateAccount.title')"
      not-closable
      @change="this.$listeners.change"
    >
      <div class="instructions">
        <div>
          {{ $t("modalRequestToCreateAccount.provideYourPublicKey") }}
        </div>
        <div>
          {{
            $t(
              "modalRequestToCreateAccount.theyMustCreateAndFundYourAccount"
            )
          }}
        </div>
      </div>

      <form
        class="request-to-create-account"
        @submit.prevent="$emit('submit')"
      >
        <qrcode-vue
          v-if="publicKey"
          :value="publicKey.toString(true)"
          class="pub-qr"
          level="L"
          size="180"
        />

        <ReadOnlyInput
          v-if="publicKey"
          :value="publicKey.toString(true)"
          multiline
        />

        <div class="buttons">
          <Button
            :label="$t('modalRequestToCreateAccount.copyPublicKey')"
            class="button"
            compact
            outline
            @click="handleClickCopy"
          />
          <Button
            :label="
              $t('modalRequestToCreateAccount.iHaveAnAccountId')
            "
            class="button"
            compact
            @click="handleHasAccount"
          />
        </div>
      </form>
    </Modal>
  </div>
</template>

<script lang="ts">
import { createComponent, PropType, SetupContext } from "@vue/composition-api";
import QrcodeVue from "qrcode.vue";

import { actions } from "../store";
import { writeToClipboard } from "../clipboard";

import Button from "./Button.vue";
import Modal from "./Modal.vue";
import ReadOnlyInput from "./ReadOnlyInput.vue";
import TextInput from "./TextInput.vue";

interface Props {
    isOpen: boolean;
    publicKey: import("@hashgraph/sdk").Ed25519PublicKey;
    event: string;
}

export default createComponent({
    name: "ModalRequestToCreateAccount",
    components: {
        Modal,
        TextInput,
        Button,
        QrcodeVue,
        ReadOnlyInput
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: Boolean,
        publicKey: Object as PropType<import("@hashgraph/sdk").Ed25519PublicKey>,
        event: String
    },
    setup(props: Props, context: SetupContext) {
        async function handleClickCopy(): Promise<void> {
            await writeToClipboard(props.publicKey.toString());
            await actions.alert({
                message: context.root.$t("common.copied").toString(),
                level: "info"
            });
        }

        function handleHasAccount(): void {
            context.emit("hasAccount");
        }

        return {
            handleClickCopy,
            handleHasAccount
        };
    }
});
</script>

<style lang="postcss" scoped>
    .button {
        width: 213px;

        @media (max-width: 600px) {
            width: 100%;

            &:first-child {
                margin-block-end: 15px;
            }
        }
    }

    .request-to-create-account {
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    .instructions {
        color: var(--color-china-blue);
        font-size: 14px;

        & div {
            padding-block-end: 15px;
        }
    }

    .pub-qr {
        padding-block-end: 40px;
        padding-block-start: 25px;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        margin-block-start: 40px;
        width: 100%;

        @media (max-width: 600px) {
            align-items: center;
            flex-direction: column;
        }
    }
</style>
