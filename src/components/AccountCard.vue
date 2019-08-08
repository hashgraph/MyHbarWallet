<template>
    <div class="account">
        <!-- TODO: Use a similar hashed image generator that MEW uses -->
        <img
            class="account-image"
            :src="'https://api.adorable.io/avatars/285/' + rawPublicKey"
        />
        <div class="content">
            <div class="title">
                Account
            </div>
            <div class="subtitle">
                <span>{{ shard }}.{{ realm }}.</span
                ><strong>{{ account }}</strong>
            </div>
            <div class="subtitle">
                {{ rawPublicKey }}
            </div>
            <!-- TODO: implement QR Button -->
            <MaterialDesignIcon class="action qr-icon" :icon="qrcode" />
            <!-- TODO: Tie Copy/Error alert to copy -->
            <MaterialDesignIcon
                class="action copy-icon"
                :icon="copy"
                @click="copyKey"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiQrcode, mdiContentCopy } from "@mdi/js";

const ED25519_PREFIX = "302a300506032b6570032100";

// Type declarations for Clipboard API
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
interface Clipboard {
    writeText(text: string): Promise<void>;
}

interface NavigatorClipboard extends Navigator {
    // Only available in a secure context.
    readonly clipboard?: Clipboard;
}

interface NavigatorExtended extends NavigatorClipboard {}

export default Vue.extend({
    components: {
        MaterialDesignIcon
    },
    props: {
        shard: { type: Number, required: true },
        realm: { type: Number, required: true },
        account: { type: Number, required: true },
        publicKey: { type: String, default: null }
    },
    computed: {
        qrcode() {
            return mdiQrcode;
        },
        copy() {
            return mdiContentCopy;
        },
        rawPublicKey(): string {
            let publicKey = this.publicKey;

            if (publicKey.startsWith(ED25519_PREFIX)) {
                // Remove ed25519 header from key if present
                publicKey = publicKey.slice(ED25519_PREFIX.length);
            }

            return publicKey;
        }
    },
    methods: {
        async copyKey() {
            await (navigator as NavigatorExtended).clipboard!.writeText(
                this.publicKey
            );

            console.log("Copied");
        }
    }
});
</script>

<style scoped lang="postcss">
.account {
    align-items: center;
    background-color: var(--color-hera-blue);
    border-radius: 4px;
    color: var(--color-white);
    display: flex;
    padding: 25px;
}

.account-image {
    border: 4px solid var(--color-white);
    border-radius: 50%;
    user-select: none;
}

img {
    align-self: flex-start;
    margin-block-start: 10px;
    margin-inline-end: 25px;
    width: 60px;
}

.title {
    font-size: 22px;
    font-weight: 500;
    user-select: none;
}

.subtitle {
    font-size: 14px;
    user-select: none;

    & > span {
        opacity: 0.5;
    }

    & > strong {
        font-weight: 400;
        opacity: 1;
    }

    &:nth-child(3) {
        margin-block-end: 12px;
    }
}

.action {
    cursor: pointer;

    &:first-of-type {
        height: 28px;
        width: 28px;
    }
}

.action + .action {
    margin-inline-start: 15px;
}
</style>
