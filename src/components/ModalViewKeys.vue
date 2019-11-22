<template>
  <div class="modal-view-keys">
    <Modal
      :is-open="isOpen"
      :title="title"
      @change="this.$listeners.change"
    >
      <div
        v-if="hasPublicKey"
        class="key-container public"
      >
        <div
          class="subtitle"
          v-text="$t('modalViewKeys.publicKey')"
        />
        <ReadOnlyInput
          class="input"
          :value="publicKey"
          multiline
        />
        <Button
          :label="$t('modalViewKeys.copyPublic')"
          class="button"
          compact
          @click="handleCopyPublicKey"
        />
      </div>
      <div
        v-if="hasPrivateKey"
        class="key-container private"
      >
        <div
          class="subtitle"
          v-text="$t('modalViewKeys.privateKey')"
        />
        <ReadOnlyInput
          class="input"
          :value="privateKey"
          multiline
          obscure
        />
        <Button
          :label="$t('modalViewKeys.copyPrivate')"
          class="button"
          compact
          @click="handleCopyPrivateKey"
        />
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, createComponent, SetupContext } from "@vue/composition-api";
import Modal from "./Modal.vue";
import ReadOnlyInput from "./ReadOnlyInput.vue";
import { writeToClipboard } from "../clipboard";
import Button from "./Button.vue";
import { actions } from "../store";

interface Props {
    isOpen: boolean;
    privateKey: string;
    publicKey: string;
}

export default createComponent({
    components: {
        Modal,
        ReadOnlyInput,
        Button
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: Boolean,
        privateKey: String,
        publicKey: String
    },
    setup(props: Props, context: SetupContext) {
        const hasPrivateKey =
            computed(() => props.privateKey !== "" && typeof props.privateKey !== "undefined");

        const hasPublicKey =
            computed(() => props.publicKey !== "" && typeof props.publicKey !== "undefined");

        const title = computed(() => {
            if (hasPrivateKey.value && hasPublicKey.value) {
                return context.root.$t("modalViewKeys.title");
            } else if (hasPublicKey.value) {
                return context.root.$t("modalViewKeys.publicKey");
            } else if (hasPrivateKey.value) {
                return context.root.$t("modalViewKeys.privateKey");
            }
            return "";
        });

        async function handleCopyPublicKey(): Promise<void> {
            await writeToClipboard(props.publicKey == null ? "" : props.publicKey);

            actions.alert({
                level: "info",
                message: context.root
                    .$t("modalViewKeys.copiedPublic")
                    .toString()
            });
        }

        async function handleCopyPrivateKey(): Promise<void> {
            await writeToClipboard(props.privateKey == null ? "" : props.privateKey);

            actions.alert({
                level: "info",
                message: context.root
                    .$t("modalViewKeys.copiedPrivate")
                    .toString()
            });
        }

        return {
            title,
            hasPrivateKey,
            hasPublicKey,
            handleCopyPublicKey,
            handleCopyPrivateKey
        };
    }
});
</script>

<style lang="postcss" scoped>
.key-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    &.private {
        padding-block-start: 40px;
    }
}

.subtitle {
    color: var(--color-china-blue);
    font-size: 24px;
    text-align: center;
}

.input {
    margin-block-start: 30px;
}

.button {
    margin-block-start: 30px;
    width: 100%;
}
</style>
