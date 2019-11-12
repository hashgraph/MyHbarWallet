<template>
  <div class="modal-request-to-create-account">
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
          size="180"
          level="L"
          class="pub-qr"
        />

        <ReadOnlyInput
          v-if="publicKey"
          multiline
          :value="publicKey.toString(true)"
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
            :label="
              $t('modalRequestToCreateAccount.iHaveAnAccountId')
            "
            class="button"
            @click="handleHasAccount"
          />
        </div>
      </form>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { createComponent, PropType, SetupContext } from "@vue/composition-api";
import QrcodeVue from "qrcode.vue";
import { writeToClipboard } from "../clipboard";
import ReadOnlyInput from "../components/ReadOnlyInput.vue";
import { ALERT } from "../store/actions";
import store from "../store";

interface Props {
    isOpen: boolean;
    publicKey: import("@hashgraph/sdk").Ed25519PublicKey;
    event: string;
}

export default createComponent({
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
        isOpen: (Boolean as unknown) as PropType<boolean>,
        publicKey: (Object as unknown) as PropType<
        import("@hashgraph/sdk").Ed25519PublicKey
        >,
        event: (String as unknown) as PropType<string>
    },
    setup(props: Props, context: SetupContext) {
        async function handleClickCopy(): Promise<void> {
            await writeToClipboard(props.publicKey.toString());
            await store.dispatch(ALERT, {
                message: context.root.$t("common.copied"),
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
