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

        return {
            accountId
        };
    }
});
</script>

<style lang="postcss" scoped>
.modal-contents {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-block-end: 80px;
    margin-block-start: 80px;
}

.account-id {
    color: var(--color-basalt-grey);
    font-size: 26px;
    justify-content: center;
    margin-block-start: 20px;
}
</style>
