<template>
    <div class="modal-send-transfer-success">
        <Modal :is-open="open" hide-decoration @change="handleModalChange">
            <div class="container">
                <MaterialDesignIcon
                    class="large-checkbox"
                    :icon="mdiCheck"
                    :size="200"
                />
                <div class="title">
                    Success
                </div>
                <div class="description">
                    Transferred <strong>{{ amount }}</strong> hbar to account
                    <strong>{{ toAccount }}</strong
                    >.
                </div>
                <Button
                    class="btn"
                    outline
                    label="Dismiss"
                    @click="handleClose"
                />
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import { createComponent } from "vue-function-api";
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import { mdiCheck } from "@mdi/js";
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
        open: Boolean,
        toAccount: Object,
        amount: Number
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
            mdiCheck
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

.large-checkbox {
    border-color: var(--color-melbourne-cup);
    border-radius: 1200px;
    border-style: solid;
    color: var(--color-melbourne-cup);
    margin-block-end: 25px;
    padding: 15px;
}
</style>
