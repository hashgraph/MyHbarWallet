<template>
    <Modal
        title="Confirmation"
        :is-open="isOpen"
        large
        @change="this.$listeners.change"
    >
        <p class="title">Signing Key</p>
        <div class="item account">
            <img
                class="account-image"
                :src="'https://api.adorable.io/avatars/285/' + rawPublicKey"
            />
            <span class="account-key"> {{ rawPublicKey }} </span>
        </div>
        <p class="title">Message</p>
        <ReadOnlyInput class="item" :value="message" />
        <p class="title">Message in hex</p>
        <ReadOnlyInput class="item" :value="hexMessage" />

        <div class="center">
            <Button label="Confirm Signing" @click="handleConfirm"></Button>
        </div>
    </Modal>
</template>
<script lang="ts">
import {
    createComponent,
    PropType,
    computed,
    SetupContext
} from "@vue/composition-api";

import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import ReadOnlyInput from "../components/ReadOnlyInput.vue";

const ED25519_PREFIX = "302a300506032b6570032100";

export default createComponent({
    components: {
        Modal,
        Button,
        ReadOnlyInput
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>,
        message: (String as unknown) as PropType<string>,
        publicKey: (String as unknown) as PropType<string>
    },
    setup(
        props: {
            isOpen: boolean;
            message: string;
            publicKey: string;
        },
        context: SetupContext
    ) {
        const rawPublicKey = computed(() => {
            let publickey = props.publicKey;
            if (publickey.startsWith(ED25519_PREFIX, 0)) {
                publickey = publickey.slice(ED25519_PREFIX.length);
            }
            return publickey;
        });

        function hexEncode(str: string): void {
            return unescape(encodeURIComponent(str))
                .split("")
                .map(v => v.charCodeAt(0).toString(16))
                .join("");
        }

        function handleConfirm(): void {
            context.emit("confirm");
        }

        const hexMessage = computed(() => `0x${hexEncode(props.message)}`);
        return {
            hexMessage,
            rawPublicKey,
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
