<template>
    <Modal :is-open="isOpen" hide-decoration @change="this.$listeners.change">
        <template>
            <div class="modal-container">
                <div class="header">Something went wrong.</div>
                <div class="sub-header">
                    Do you want to inform MHW about this error?
                </div>

                <div class="stack-trace">
                    {{ stackTrace.value }}
                </div>

                <div class="button-group">
                    <Button
                        class="button-cancel"
                        label="Cancel"
                        :outline="true"
                        :compact="true"
                    />
                    <Button class="button-send" label="Send" :compact="true" />
                </div>
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import { computed, createComponent } from "@vue/composition-api";
import store from "../store";

interface Props {
    isOpen: boolean;
}

export default createComponent({
    components: {
        Button,
        Modal
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    setup(props: Props) {
        const stackTrace = computed((): string => {
            if (store.state.errors.error == null) {
                return "";
            }

            return store.state.errors.error.stack != null
                ? store.state.errors.error.stack
                : "";
        });

        return {
            isOpen: props.isOpen,
            stackTrace
        };
    }
});
</script>

<style lang="postcss" scoped>
.button-group {
    display: flex;
    justify-content: space-between;
    justify-self: center;
}

.button-cancel,
.button-send {
    min-width: initial;
    width: 48.2%;
}

.stack-trace {
    color: var(--color-christmas-pink);
    font-family: monospace;
    font-size: 13px;
    margin-block: 40px;
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
}

.header {
    color: var(--color-ghostlands-coal);
    display: flex;
    font-size: 32px;
    font-weight: 700;
    justify-content: center;
    margin-block-end: 20px;
    max-width: 300px;
    text-align: center;
}

.sub-header {
    color: var(--color-china-blue);
    font-size: 14px;
}

.modal-container {
    align-items: center;
    display: flex;
    flex-flow: column;
    padding: 20px;
}
</style>
