<template>
  <div class="modal-success">
    <Modal
      :crown="mdiCheck"
      :is-open="state.isOpen"
      garlands
      hide-decoration
      small
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
            class="copy-button"
            compact
            @click="handleAction"
          />
          <Button
            :class="{ 'dismiss-button': true, full: !hasAction }"
            :disabled="hasAction && !actionClicked"
            :label="dismissLabel"
            compact
            @click="handleDismiss"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, createComponent, PropType, ref } from "@vue/composition-api";
import { mdiCheck } from "@mdi/js";

import Button from "./Button.vue";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import Modal from "./Modal.vue";
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

export default createComponent({
    name: "ModalSuccess",
    components: {
        Modal,
        Button,
        ReadOnlyInput,
        MaterialDesignIcon
    },
    props: { state: Object as PropType<State> },
    model: {
        prop: "state",
        event: "change"
    },
    setup(props: Props, context): object {
        // eslint-disable-next-line max-len
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

<style lang="postcss" scoped>
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
