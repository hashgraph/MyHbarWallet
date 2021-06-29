<template>
  <Modal
    :is-open="isOpen"
    :large="false"
    not-closable
    :title="$t('modalRequestToCreateAccount.title')"
    @change="this.$listeners.change"
  >
    <div class="instructions">
      <div>
        {{ $t("modalRequestToCreateAccount.provideYourPublicKey") }}
      </div>
      <div>
        {{ $t("modalRequestToCreateAccount.theyMustCreateAndFundYourAccount") }}
      </div>
    </div>

    <form class="request-to-create-account" @submit.prevent="$emit('submit')">
      <qrcode-vue
        v-show="publicKey != null"
        :value="publicKey != null ? publicKey.toString(true) : ''"
        size="180"
        level="L"
        class="pub-qr"
      />

      <ReadOnlyInput
        v-show="publicKey != null"
        :key="componentKey"
        ref="keyRef"
        multiline
        :value="publicKey != null ? publicKey.toString(true) : ''"
      />

      <div class="buttons">
        <Button
          compact
          outline
          :label="$t('modalRequestToCreateAccount.copyPublicKey')"
          class="button"
          @click="handleClickCopy"
        />
        <Button
          compact
          :label="$t('modalRequestToCreateAccount.iHaveAnAccountId')"
          class="button"
          @click="handleHasAccount"
        />
      </div>
    </form>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, SetupContext, Ref, ref } from "@vue/composition-api";
import QrcodeVue from "qrcode.vue";

import { writeToClipboard } from "../../service/clipboard";
import { actions } from "../store";

import Modal from "./Modal.vue";
import TextInput from "./TextInput.vue";
import Button from "./Button.vue";
import ReadOnlyInput from "./ReadOnlyInput.vue";

interface Props {
  isOpen: boolean;
  publicKey: string;
  event: string;
}

export default defineComponent({
  name: "ModalRequestToCreateAccount",
  components: {
    Modal,
    TextInput,
    Button,
    QrcodeVue,
    ReadOnlyInput,
  },
  model: {
    prop: "isOpen",
    event: "change",
  },
  props: {
    isOpen: Boolean,
    publicKey: { type: String, required: true },
    event: String,
  },
  setup(props: Props, context: SetupContext) {
    const keyRef: Ref<Vue | null> = ref(null);
    const componentKey = ref(0);

    async function handleClickCopy(): Promise<void> {
      componentKey.value += 1;

      context.root.$nextTick(async () => {
        if (keyRef.value != null) {
          writeToClipboard(keyRef.value.$el as HTMLElement);

          await actions.alert({
            message: context.root.$t("common.copied").toString(),
            level: "info",
          });
        }
      });
    }

    function handleHasAccount(): void {
      context.emit("hasAccount");
    }

    return {
      keyRef,
      componentKey,
      handleClickCopy,
      handleHasAccount,
    };
  },
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
