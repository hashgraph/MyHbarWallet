<template>
    <div class="modal-send-transfer-success">
        <Modal :is-open="open" hide-decoration @change="handleModalChange">
            <div class="container">
                <MaterialDesignIcon
                    class="check"
                    :icon="mdiCheckCircleOutline"
                />
                <div class="title">
                    Success
                </div>
                <div class="description">
                    Continue transaction with Web3 Wallet Provider.
                </div>
                <Button class="btn" label="Close" @click="handleClose" />
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import { createComponent } from "vue-function-api";
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import { mdiCheckCircleOutline } from "@mdi/js";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";

export default createComponent({
    components: {
        Modal,
        Button,
        MaterialDesignIcon
    },
    model: {
        prop: "open",
        event: "change"
    },
    props: {
        open: Boolean
    },
    setup(props, context): object {
        function handleModalChange(isOpen: boolean) {
            context.emit("change", isOpen);
        }

        function handleClose() {
            context.emit("change", false);
        }

        return {
            handleModalChange,
            handleClose,
            mdiCheckCircleOutline
        };
    }
});
</script>

<style scoped lang="postcss">
.container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.title {
    color: var(--color-yankees-blue);
    font-size: 30px;
    font-weight: 700;
    margin-block-end: 20px;
}

.description {
    color: var(--color-china-blue);
}

.btn {
    margin-block-start: 40px;
}

.check {
    color: var(--color-melbourne-cup);
    height: 146px;
    margin-block-end: 15px;
    width: 146px;
}
</style>
