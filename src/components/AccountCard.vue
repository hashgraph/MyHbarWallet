<template>
    <div class="account">
        <!-- TODO: Use a similar hashed image generator that MEW uses -->
        <img
            class="account-image"
            :src="'https://api.adorable.io/avatars/285/' + rawPublicKey"
        />
        <div class="content">
            <div class="top">
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
            </div>
            <div class="actions">
                <!-- TODO: implement QR Button -->
                <Tooltip
                    class="action"
                    :pinnable="false"
                    message="Account Qrcode"
                >
                    <MaterialDesignIcon class="qr-icon" :icon="mdiQrcode" />
                </Tooltip>
                <!-- TODO: Tie Copy/Error alert to copy -->
                <Tooltip class="action" :pinnable="false" message="Copy">
                    <MaterialDesignIcon
                        class="copy-icon"
                        :icon="mdiContentCopy"
                        @click="copyKey"
                    />
                </Tooltip>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiQrcode, mdiContentCopy } from "@mdi/js";
import Tooltip from "@/components/Tooltip.vue";
import { writeToClipboard } from "@/clipboard";
import { computed, createComponent } from "vue-function-api";
import { PropType } from "vue/types/options";

const ED25519_PREFIX = "302a300506032b6570032100";

export default createComponent({
    components: {
        MaterialDesignIcon,
        Tooltip
    },
    props: {
        shard: (Number as unknown) as PropType<number>,
        realm: (Number as unknown) as PropType<number>,
        account: (Number as unknown) as PropType<number>,
        publicKey: (String as unknown) as PropType<string>
    },
    setup(props) {
        const rawPublicKey = computed(() => {
            let publickey = props.publicKey;
            if (publickey.startsWith(ED25519_PREFIX)) {
                publickey = publickey.slice(ED25519_PREFIX.length);
            }
            return publickey;
        });
        const copyKey = async () => {
            await writeToClipboard(props.publickey);
            console.log("Copied");
        };
        return {
            mdiQrcode,
            mdiContentCopy,
            rawPublicKey,
            copyKey
        };
    }
});
</script>

<style scoped lang="postcss">
.account {
    background-color: var(--color-hera-blue);
    border-radius: 4px;
    color: var(--color-white);
    display: flex;
    padding: 25px;
}

.account-image {
    border: 4px solid var(--color-white);
    border-radius: 50%;
    flex-shrink: 0;
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
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: normal;
    }
}

.actions {
    align-items: center;
    display: flex;
}

.action {
    cursor: pointer;
}

.action + .action {
    margin-inline-start: 15px;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - 60px - 25px);
}
</style>
