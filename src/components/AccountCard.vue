<template>
    <div class="account">
        <Identicon :value="rawPublicKey" :size="60" class="account-image" />
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
                <Tooltip class="action" message="Account QR Code">
                    <MaterialDesignIcon
                        class="qr-icon"
                        :icon="mdiQrcode"
                        @click="showQrCode"
                    />
                </Tooltip>
                <!-- TODO: Tie Copy/Error alert to copy -->
                <Tooltip class="action" message="Copy Key">
                    <MaterialDesignIcon
                        class="copy-icon"
                        :icon="mdiContentCopy"
                        @click="copyKey"
                    />
                </Tooltip>
            </div>
        </div>
        <ModalViewAccountQR v-model="viewAccountQrCodeIsOpen" />
    </div>
</template>

<script lang="ts">
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import { mdiQrcode, mdiContentCopy } from "@mdi/js";
import Tooltip from "@/components/Tooltip.vue";
import { writeToClipboard } from "@/clipboard";
import { computed, createComponent, PropType, value } from "vue-function-api";
import Identicon from "@/components/Identicon.vue";
import { ALERT } from "@/store/actions";
import store from "@/store";
import ModalViewAccountQR from "@/components/ModalViewAccountQR.vue";

const ED25519_PREFIX = "302a300506032b6570032100";

export default createComponent({
    components: {
        MaterialDesignIcon,
        Tooltip,
        Identicon,
        ModalViewAccountQR
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
            if (publickey.startsWith(ED25519_PREFIX, 0)) {
                publickey = publickey.slice(ED25519_PREFIX.length);
            }

            return publickey;
        });

        const viewAccountQrCodeIsOpen = value(false);

        const copyKey = async () => {
            await writeToClipboard(props.publicKey);

            store.dispatch(ALERT, {
                level: "info",
                message: "Copied"
            });
        };

        function showQrCode() {
            viewAccountQrCodeIsOpen.value = true;
        }

        return {
            mdiQrcode,
            mdiContentCopy,
            rawPublicKey,
            viewAccountQrCodeIsOpen,
            copyKey,
            showQrCode
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

    @media (max-width: 1024px) {
        padding: 10px;
    }
}

.account-image {
    align-self: flex-start;
    border: 3px solid var(--color-white);
    border-radius: 50%;
    flex-shrink: 0;
    margin-block-start: 10px;
    margin-inline-end: 25px;
    user-select: none;
    width: 60px;

    @media (max-width: 1024px) {
        height: 41px;
        margin-block-start: 0;
        margin-inline-end: 0;
        width: 41px;
    }
}

.title {
    font-size: 22px;
    font-weight: 500;
    user-select: none;

    @media (max-width: 1024px) {
        display: none;
    }
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
        inset-block-end: 0;
        margin-block-end: 12px;
        overflow: hidden;
        position: absolute;
        text-overflow: ellipsis;

        /* intrinsic sizing for stretch not supported without prefix */
        /* stylelint-disable */
        width: stretch;
        width: -webkit-fill-available;
        width: -moz-available;
        /* stylelint-enable */
        word-break: normal;

        @media (max-width: 1024px) {
            display: none;
        }
    }
}

.actions {
    align-items: center;
    display: flex;
    margin-inline-end: 8px;
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
    flex-grow: 1;
    justify-content: space-between;
    width: calc(100% - 60px - 25px);

    @media (max-width: 1024px) {
        flex-direction: row;
    }
}

.top {
    /* Make room for second subtitle, the public key */
    padding-block-end: 33px;
    position: relative;

    @media (max-width: 1024px) {
        align-self: center;
        margin-inline-start: 10px;
        padding-block-end: 0;
    }
}
</style>
