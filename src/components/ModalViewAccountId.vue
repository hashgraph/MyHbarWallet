<template>
    <Modal
        :large="false"
        :is-open="isOpen"
        title="Account ID"
        @change="this.$listeners.change"
    >
        <div class="modal-contents">
            <qrcode-vue
                :value="accountId"
                size="200"
                level="L"
                class="pub-qr"
            />

            <ReadOnlyInput class="account-id" :value="accountId" />

            <Button
                compact
                label="Copy Account ID"
                class="button"
                @click="handleClickCopy"
            />
        </div>
    </Modal>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import ReadOnlyInput from "../components/ReadOnlyInput.vue";
import Button from "../components/Button.vue";
import { createComponent, PropType, computed } from "@vue/composition-api";
import QrcodeVue from "qrcode.vue";
import store from "../store";
import { Id } from "../store/modules/wallet";
import { writeToClipboard } from "../clipboard";
import { ALERT } from "../store/actions";

interface Props {
    isOpen: boolean;
    event: "change";
    value: Id | null;
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
        value: (Object as unknown) as PropType<Id | null>,
        isOpen: (Boolean as unknown) as PropType<boolean>,
        event: (String as unknown) as PropType<string>
    },
    setup(props: Props) {
        const accountId = computed(() => {
            return props.value
                ? `${props.value.shard}.${props.value.realm}.${props.value.account}`
                : "";
        });

        async function handleClickCopy(): Promise<void> {
            const id = accountId.value;
            if (id != null) {
                await writeToClipboard(id);
                store.dispatch(ALERT, { message: "Copied", level: "info" });
            }
        }

        return {
            accountId,
            handleClickCopy
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-contents {
    align-items: center;
    display: flex;
    flex-direction: column;
}

.pub-qr {
    margin-block-end: 40px;
}

.account-id {
    color: var(--color-basalt-grey);
    font-size: 26px;
    margin-block-end: 40px;
    text-align: center;
}

.button {
    width: 200px;

    @media (max-width: 425px) {
        width: 100%;
    }
}
</style>
