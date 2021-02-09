<template>
    <Modal
        v-model="state.isOpen"
        :title="$t('modalEditTransfer.title')"
        @change="this.$listeners.change"
    >
        <form
            @submit.prevent.stop="handleSubmit"
        >
            <TransferList :transfers="state.transfers" table />
            <Button
                :label="$t('modalEditTransfer.save')"
                type="submit"
            />
        </form>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";

import { Transfer } from "../../domain/transfer";

import Button from "./Button.vue";
import Modal from "./Modal.vue";
import TransferList from "./TransferList.vue";

export interface State {
    isOpen: boolean;
    transfers: Transfer[];
}

export default defineComponent({
    name: "ModalTransferSummary",
    model: {
        prop: "state",
        event: "change"
    },
    props: { state: { type: Object as PropType<State>, required: true }},
    components: {
        Button,
        Modal,
        TransferList
    },
    setup(props, context) {
        function handleCancel(): void {
            props.state.isOpen = false;
        }

        function handleSubmit(): void {
            context.emit("submit");
        }

        return {
            handleCancel,
            handleSubmit
        };
    }
});
</script>

<style lang="postcss" scoped>
.input {
    padding-block-end: 5px;
}
</style>
