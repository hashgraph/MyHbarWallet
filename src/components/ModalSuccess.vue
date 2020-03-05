<template>
    <Modal
        :is-open="state.isOpen"
        small
        hide-decoration
        garlands
        :crown="mdiCheck"
    >
        <div class="container">
            <div class="title">
                {{ $t("common.success") }}
            </div>
            <div class="description">
                <slot />
            </div>
            <div class="button-container">
                <Button
                    v-if="hasAction"
                    :label="actionLabel"
                    :outline="hasAction && actionClicked"
                    compact
                    class="copy-button"
                    @click="handleAction"
                />
                <Button
                    :label="dismissLabel"
                    :disabled="hasAction && !actionClicked"
                    compact
                    :class="{ 'dismiss-button': true, full: !hasAction }"
                    @click="handleDismiss"
                />
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import { mdiCheck } from "@mdi/js";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import ReadOnlyInput from "./ReadOnlyInput.vue";

export interface State {
    isOpen: boolean;
    hasAction?: boolean | undefined;
    actionLabel?: string | undefined;
    dismissLabel?: string | undefined;
}

interface Props {
    state: State;
}

export default defineComponent({
    components: {
        Modal,
        Button,
        ReadOnlyInput,
        MaterialDesignIcon
    },
    props: { state: (Object as unknown) as PropType<State> },
    model: {
        prop: "state",
        event: "change"
    },
    setup(props: Props, context): object {
        const hasAction = computed(() => props.state.hasAction == null ? false : props.state.hasAction);
        const actionLabel = computed(() => props.state.actionLabel != null ?
            props.state.actionLabel :
            "Action");
        const dismissLabel = computed(() => props.state.dismissLabel != null ?
            props.state.dismissLabel :
            "Dismiss");
        const actionClicked = ref(false);

        function handleAction(): void {
            actionClicked.value = true;
            context.emit("action");
        }

        function handleDismiss(): void {
            actionClicked.value = false;
            context.emit("dismiss");
        }

        return {
            hasAction,
            actionLabel,
            dismissLabel,
            actionClicked,
            handleAction,
            handleDismiss,
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
}

.action {
    margin-block-end: 25px;
    width: 100%;
}

.title {
    color: var(--color-melbourne-cup);
    font-size: 42px;
    font-weight: 600;
    margin-block-end: 20px;
    margin-block-start: 50px;
}

.description {
    color: var(--color-china-blue);
    margin-block-end: 50px;
}

.button-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 600px) {
        align-items: center;
        flex-direction: column;
    }
}

.copy-button {
    width: 45%;

    @media (max-width: 600px) {
        margin-block-end: 15px;
        width: 100%;
    }
}

.dismiss-button {
    width: 45%;

    &.full {
        width: 100%;
    }

    @media (max-width: 600px) {
        width: 100%;
    }
}
</style>
