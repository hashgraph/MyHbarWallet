<template>
    <Modal
        :large="false"
        :is-open="isOpen"
        :title="$t('modalViewAccountId.title')"
        @change="this.$listeners.change"
    >
        <div class="modal-contents">
            <qrcode-vue
                :value="accountId"
                size="200"
                level="L"
                class="pub-qr"
            />

            <ReadOnlyInput
                class="account-id"
                :value="accountId"
            />

            <Button
                compact
                :label="$t('modalViewAccountId.copyAccountId')"
                class="button"
                @click="handleClickCopy"
            />
        </div>
    </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@vue/composition-api";
import QrcodeVue from "qrcode.vue";
import { AccountId } from "@hashgraph/sdk";

import { writeToClipboard } from "../../service/clipboard";
import { actions } from "../store";

import Modal from "./Modal.vue";
import ReadOnlyInput from "./ReadOnlyInput.vue";
import Button from "./Button.vue";

interface Props {
    isOpen: boolean;
    event: "change";
    value: AccountId | null;
}

export default defineComponent({
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
        value: (Object as unknown) as PropType<AccountId | null>,
        isOpen: (Boolean as unknown) as PropType<boolean>,
        event: (String as unknown) as PropType<string>
    },
    setup(props: Props, context) {
        const accountId = computed(() => props.value ?
            `${props.value.shard}.${props.value.realm}.${props.value.account}` :
            "");

        async function handleClickCopy(): Promise<void> {
            const id = accountId.value;
            if (id != null) {
                await writeToClipboard(id);
                actions.alert({
                    message: context.root.$t("common.copied").toString(),
                    level: "info"
                });
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

    @media (max-width: 600px) {
        width: 100%;
    }
}
</style>
