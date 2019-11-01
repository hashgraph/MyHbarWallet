<template>
    <div class="modal-success">
        <Modal
            :is-open="state.isOpen"
            hide-decoration
            @change="handleModalChangeIsOpen"
        >
            <div class="container">
                <MaterialDesignIcon
                    class="large-checkbox"
                    :icon="mdiCheck"
                    :size="210"
                />
                <div class="title">
                    {{ $t("common.success") }}
                </div>
                <div class="description">
                    <slot></slot>
                </div>
                <ReadOnlyInput
                    v-if="hasCopyable"
                    :value="state.copyInfo"
                    class="copyable"
                />
                <div class="button-container">
                    <Button
                        v-if="hasCopyable"
                        :label="$t('common.copy')"
                        :outline="hasCopyable && copyClicked"
                        compact
                        class="copy-button"
                        @click="handleCopy"
                    />
                    <Button
                        :label="$t('common.continue')"
                        :disabled="hasCopyable && !copyClicked"
                        compact
                        :class="{ 'continue-button': true, full: !hasCopyable }"
                        @click="handleContinue"
                    />
                </div>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import { computed, createComponent, PropType, ref } from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import { mdiCheck } from "@mdi/js";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import { writeToClipboard } from "../clipboard";
import { ALERT } from "../store/actions";
import store from "../store";
import ReadOnlyInput from "./ReadOnlyInput.vue";

export interface State {
    isOpen: boolean;
    copyInfo: string | null;
}

export default createComponent({
    components: {
        Modal,
        Button,
        ReadOnlyInput,
        MaterialDesignIcon
    },
    props: {
        state: (Object as unknown) as PropType<State>
    },
    model: {
        prop: "state",
        event: "change"
    },
    setup(props: { state: State }, context): object {
        const copyClicked = ref(false);

        const hasCopyable = computed(
            () => props.state.copyInfo !== "" && props.state.copyInfo !== null
        );

        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", { ...props.state, isOpen });
        }

        async function handleCopy(): Promise<void> {
            await writeToClipboard(props.state.copyInfo!);
            copyClicked.value = true;

            await store.dispatch(ALERT, {
                level: "info",
                message: context.root.$t("common.copied").toString()
            });
        }

        function handleContinue(): void {
            copyClicked.value = false;
            context.emit("continue");
        }

        return {
            copyClicked,
            hasCopyable,
            handleModalChangeIsOpen,
            handleCopy,
            handleContinue,
            mdiCheck
        };
    }
});
</script>

<style scoped lang="postcss">
.container {
    align-items: center;
    background-image: url("../assets/garlands.png");
    background-repeat: no-repeat;
    background-size: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.copyable {
    margin-block-end: 25px;
    width: 100%;
}

.title {
    color: var(--color-yankees-blue);
    font-size: 30px;
    font-weight: 700;
    margin-block-end: 20px;
}

.description {
    color: var(--color-china-blue);
    margin-block-end: 25px;
}

.large-checkbox {
    border-color: var(--color-melbourne-cup);
    border-radius: 1200px;
    border-style: solid;
    color: var(--color-melbourne-cup);
    margin-block-end: 25px;
    padding: 15px;
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
    width: 213px;

    @media (max-width: 600px) {
        margin-block-end: 15px;
        width: 100%;
    }
}

.continue-button {
    width: 213px;

    &.full {
        width: 100%;
    }

    @media (max-width: 600px) {
        width: 100%;
    }
}
</style>
