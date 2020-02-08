<template>
  <Modal
    :is-open="isOpen"
    :large="false"
    :title="$t('modalViewAccountId.title')"
    @change="this.$listeners.change"
  >
    <div class="modal-contents">
      <qrcode-vue
        :value="accountId"
        class="pub-qr"
        level="L"
        size="200"
      />

      <ReadOnlyInput
        :value="accountId"
        class="account-id"
      />

      <Button
        :label="$t('modalViewAccountId.copyAccountId')"
        class="button"
        compact
        @click="handleClickCopy"
      />
    </div>
  </Modal>
</template>

<script lang="ts">
import { computed, createComponent, PropType } from "@vue/composition-api";
import QrcodeVue from "qrcode.vue";

import { writeToClipboard } from "../clipboard";
import { actions } from "../store";

import Button from "./Button.vue";
import Modal from "./Modal.vue";
import ReadOnlyInput from "./ReadOnlyInput.vue";

interface Props {
    isOpen: boolean;
    event: "change";
    value: import("@hashgraph/sdk").AccountId | null;
}

export default createComponent({
    name: "ModalViewAccountId",
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
        value: Object as PropType<import("@hashgraph/sdk").AccountId | null>,
        isOpen: Boolean,
        event: String
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
