<template>
  <Modal
    :is-open="isOpen"
    :title="$t('modalConfirmSignMessage.title')"
    large
    @change="this.$listeners.change"
  >
    <p class="title">
      {{ $t("modalConfirmSignMessage.signingKey") }}
    </p>
    <div class="item account">
      <img
        :src="'https://api.adorable.io/avatars/285/' + publicKey"
        class="account-image"
      >
      <span class="account-key"> {{ publicKey }} </span>
    </div>
    <p class="title">
      {{ $t("common.message") }}
    </p>
    <ReadOnlyInput
      :value="message"
      class="item"
    />
    <p class="title">
      {{ $t("modalConfirmSignMessage.messageInHex") }}
    </p>
    <ReadOnlyInput
      :value="hexMessage"
      class="item"
    />

    <div class="center">
      <Button
        :label="$t('modalConfirmSignMessage.confirmSigning')"
        @click="handleConfirm"
      />
    </div>
  </Modal>
</template>
<script lang="ts">
import { computed, createComponent, SetupContext } from "@vue/composition-api";

import Button from "./Button.vue";
import Modal from "./Modal.vue";
import ReadOnlyInput from "./ReadOnlyInput.vue";

interface Props {
    isOpen: boolean;
    message: string;
    publicKey: string;
}

function hexEncode(str: string): string {
    return unescape(encodeURIComponent(str))
        .split("")
        .map((v) => v.charCodeAt(0).toString(16))
        .join("");
}

export default createComponent({
    name: "ModalConfirmSignMessage",
    components: {
        Modal,
        Button,
        ReadOnlyInput
    },
    props: {
        isOpen: Boolean,
        message: String,
        publicKey: String
    },
    setup(props: Props, context: SetupContext) {
        function handleConfirm(): void {
            context.emit("confirm");
        }

        const hexMessage = computed(() => `0x${hexEncode(props.message)}`);
        return {
            hexMessage,
            handleConfirm
        };
    }
});
</script>

<style lang="postcss" scoped>
    .title {
        color: var(--color-ghostlands-coal);
        font-size: 16px;
        font-weight: 600;
        margin-block-end: 20px;
    }

    .item {
        background: var(--color-peral);
        color: var(--color-washed-black);
        margin-block-end: 40px;
        padding: 20px;
    }

    .account {
        align-items: center;
        display: flex;
    }

    .account-image {
        border: 0 solid var(--color-white);
        border-radius: 50%;
        flex-shrink: 0;
        margin-inline-end: 20px;
        user-select: none;
    }

    .account-key {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    img {
        width: 30px;
    }

    .center {
        display: flex;
        justify-content: center;
    }
</style>
