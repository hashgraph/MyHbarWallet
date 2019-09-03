<template>
    <div class="create-account-success">
        <Modal
            :is-open="isOpen"
            not-closable
            hide-decoration
            @change="this.$listeners.change"
        >
            <div class="container">
                <MaterialDesignIcon
                    class="large-checkbox"
                    :size="200"
                    :icon="mdiCheck"
                />
                <div class="title">
                    Success
                </div>
                <ReadOnlyInput class="center" :value="accountId" />
                <Button outline class="btn" label="Copy" @click="handleCopy" />
                <div class="close" @click="handleClose">Dismiss</div>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import { createComponent, PropType } from "@vue/composition-api";
import { writeToClipboard } from "../clipboard";
import { mdiCheck } from "@mdi/js";
import Modal from "../components/Modal.vue";
import ReadOnlyInput from "../components/ReadOnlyInput.vue";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import Button from "../components/Button.vue";
import store from "../store";
import { ALERT } from "../store/actions";

export default createComponent({
    components: {
        Modal,
        MaterialDesignIcon,
        ReadOnlyInput,
        Button
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>,
        accountId: (String as unknown) as PropType<string>
    },
    setup(
        props: {
            isOpen: boolean;
            accountId: string;
        },
        context
    ) {
        function handleCopy(): void {
            store.dispatch(ALERT, { message: "Copied", level: "info" });
            writeToClipboard(props.accountId);
        }

        function handleClose(): void {
            context.emit("change", false);
        }

        return {
            mdiCheck,
            handleCopy,
            handleClose
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

.center {
    text-align: center;
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

.close {
    color: var(--color-basalt-grey);
    margin-block-start: 30px;

    &:hover,
    &:focus {
        cursor: pointer;
        text-decoration: underline;
    }
}
</style>
