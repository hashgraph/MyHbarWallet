<template>
    <Modal
        :title="$t('modalConfirmSignMessage.title')"
        :is-open="isOpen"
        large
        @change="this.$listeners.change"
    >
        <p class="title">
            {{ $t("modalConfirmSignMessage.signingKey") }}
        </p>
        <div class="item account">
            <img
                class="account-image"
                :src="'https://api.adorable.io/avatars/285/' + publicKey"
            >
            <span class="account-key"> {{ publicKey }} </span>
        </div>
        <p class="title">
            {{ $t("common.message") }}
        </p>
        <ReadOnlyInput
            class="item"
            :value="message"
        />
        <p class="title">
            {{ $t("modalConfirmSignMessage.messageInHex") }}
        </p>
        <ReadOnlyInput
            class="item"
            :value="hexMessage"
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
import { defineComponent, computed, SetupContext } from "@vue/composition-api";

import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import ReadOnlyInput from "../components/ReadOnlyInput.vue";

function hexEncode(str: string): string {
    return unescape(encodeURIComponent(str))
        .split("")
        .map((v) => v.charCodeAt(0).toString(16))
        .join("");
}

export default defineComponent({
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
    setup(
        props: {
            isOpen: boolean;
            message: string;
            publicKey: string;
        },
        context: SetupContext
    ) {
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
