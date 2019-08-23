<template>
    <Modal
        :is-open="isOpen"
        hide-decoration
        compact
        title="Account Id"
        no-decoration
        @change="this.$listeners.change"
    >
        <div class="modal-contents">
            <qrcode-vue
                :value="accountId"
                size="200"
                level="L"
                class="pub-qr"
            />

            <div class="account-id">
                {{ accountId }}
            </div>

            <div class="copy-button" @click="handleClickCopy">
                Copy
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import ReadOnlyInput from "../components/ReadOnlyInput.vue";
import Button from "../components/Button.vue";
import { createComponent, PropType, computed } from "vue-function-api";
import QrcodeVue from "qrcode.vue";
import { writeToClipboard } from "../clipboard";
import store from "../store";
import { Id } from "../store/modules/wallet";

interface Props {
    isOpen: boolean;
    event: "change";
}

export default createComponent({
    components: {
        Modal,
        ReadOnlyInput,
        Button,
        QrcodeVue
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>,
        event: (String as unknown) as PropType<string>
    },
    setup(props, context) {
        const accountId = computed(() => {
            const accountId: Id | null = store.state.wallet.session
                ? store.state.wallet.session.account
                : null;

            return accountId
                ? `${accountId.shard}.${accountId.realm}.${accountId.account}`
                : null;
        });

        async function handleClickCopy() {
            if (accountId.value != null) {
                await writeToClipboard(accountId.value.toString());
            }
        }

        function handleHasAccount() {
            context.emit("hasAccount");
        }

        return {
            accountId,
            handleClickCopy,
            handleHasAccount
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-contents {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-block-start: 40px;
}

.account-id {
    color: var(--color-basalt-grey);
    font-size: 26px;
    justify-content: center;
    margin-block-start: 20px;
}

.copy-button {
    align-items: center;
    color: var(--color-melbourne-cup);
    cursor: pointer;
    display: flex;
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    font-weight: 500;
    justify-content: center;
    margin-block-end: 20px;
    margin-block-start: 20px;
    text-decoration: none;
    user-select: none;
}
</style>
