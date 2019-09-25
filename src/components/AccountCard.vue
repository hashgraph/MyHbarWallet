<template>
    <div class="account">
        <Identicon :size="60" :value="publicKey" class="account-image" />
        <div class="content">
            <div class="top">
                <div class="title">
                    {{ $t("accountCard.account") }}
                </div>
                <div class="subtitle">
                    <span>{{ shard }}.{{ realm }}.</span
                    ><strong>{{ account }}</strong>
                </div>
            </div>
            <div class="actions">
                <Tooltip
                    :message="$t('accountCard.accountQrCode')"
                    class="action"
                >
                    <MaterialDesignIcon
                        :icon="mdiQrcode"
                        class="qr-icon"
                        @click="showQrCode"
                    />
                </Tooltip>
                <Tooltip :message="$t('accountCard.keys')" class="action">
                    <MaterialDesignIcon
                        :icon="mdiKey"
                        class="key-icon"
                        @click="showKeys"
                    />
                </Tooltip>
                <ExportKeystoreButton
                    v-if="hasPrivateKey"
                    :private-key="privateKey"
                    class="action"
                />
            </div>
        </div>
        <ModalViewAccountId
            v-model="state.viewAccountQrCodeIsOpen"
            :value="{ shard, realm, account }"
        />
        <ModalViewKeys
            v-if="hasKeys"
            v-model="state.viewKeysIsOpen"
            :public-key="publicKey"
            :private-key="privateKey"
        />
    </div>
</template>

<script lang="ts">
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import { mdiQrcode, mdiKey } from "@mdi/js";
import Tooltip from "../components/Tooltip.vue";
import { computed, createComponent, reactive } from "@vue/composition-api";
import Identicon from "../components/Identicon.vue";
import ModalViewAccountId from "../components/ModalViewAccountId.vue";
import ExportKeystoreButton from "./ExportKeystoreButton.vue";
import ModalViewKeys from "./ModalViewKeys.vue";
import store from "../store";

function getPublicKey(): string | null {
    return store.state.wallet.session != null
        ? store.state.wallet.session.privateKey.publicKey.toString(true) // Truncate Prefix
        : null;
}

function getPrivateKey(): string | null {
    return store.state.wallet.session != null
        ? store.state.wallet.session.privateKey.toString(true) // Truncate Prefix
        : null;
}

interface Props {
    shard: number;
    realm: number;
    account: number;
}

export default createComponent({
    components: {
        MaterialDesignIcon,
        Tooltip,
        Identicon,
        ModalViewAccountId,
        ModalViewKeys,
        ExportKeystoreButton
    },
    props: {
        shard: Number,
        realm: Number,
        account: Number
    },
    setup() {
        const hasPrivateKey = computed(() => getPrivateKey() !== null);
        const hasPublicKey = computed(() => getPublicKey() !== null);
        const hasKeys = computed(
            () => hasPrivateKey.value && hasPublicKey.value
        );
        const privateKey = computed(() => getPrivateKey());
        const publicKey = computed(() => getPublicKey());

        const state = reactive({
            viewAccountQrCodeIsOpen: false,
            viewKeysIsOpen: false
        });

        function showKeys(): void {
            state.viewKeysIsOpen = true;
        }

        function showQrCode(): void {
            state.viewAccountQrCodeIsOpen = true;
        }

        return {
            mdiQrcode,
            mdiKey,
            state,
            hasPrivateKey,
            hasPublicKey,
            hasKeys,
            privateKey,
            publicKey,
            showKeys,
            showQrCode
        };
    }
});
</script>

<style lang="postcss" scoped>
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
