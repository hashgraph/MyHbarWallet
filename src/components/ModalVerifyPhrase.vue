<template>
    <div class="verify-phrase">
        <Modal
            title="Verification"
            :is-open="isOpen"
            @change="this.$listeners.change"
        >
            <div class="prompt">
                Please enter and fill out the empty boxes below to verify your
                mnemonic phrase key.
            </div>
            <form @submit.prevent="handleVerify">
                <div class="mnemonic">
                    <label
                        v-for="index in words.length"
                        :key="index"
                        :class="{
                            readonly: isDisabled(index - 1),
                            'is-focused': state.focused === index - 1
                        }"
                    >
                        <span class="number">{{ index }}.</span>
                        <input
                            class="word"
                            :readonly="isDisabled(index - 1)"
                            :value="valueForIndex(index - 1)"
                            :data-index="index - 1"
                            :tabindex="isDisabled(index - 1) ? -1 : null"
                            @focus="handleFocus"
                            @input="handleInput"
                        />
                    </label>
                </div>
                <div class="btn-container">
                    <Button label="Verify" />
                </div>
            </form>
        </Modal>
    </div>
</template>

<script lang="ts">
import {
    createComponent,
    PropType,
    reactive,
    watch,
    SetupContext
} from "@vue/composition-api";
import Modal from "./Modal.vue";
import Button from "../components/Button.vue";
import store from "../store";
import { ALERT } from "../store/actions";
import TextInput from "../components/TextInput.vue";

interface Props {
    isOpen: boolean;
    words: string[];
}

export default createComponent({
    components: {
        Modal,
        Button,
        TextInput
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>,
        words: (Array as unknown) as PropType<string[]>
    },
    setup(props: Props, context: SetupContext) {
        let inputMap: Map<number, string> = new Map();

        const state = reactive({
            focused: null as number | null
        });

        function randomizeEmpties(): void {
            // there should never be a case where the list of words is less than 5, except in test or some odd error
            // if it is less than 5 an infinite loop used to happen breaking tests, this should prevent that.
            const maxSize = props.words.length >= 5 ? 5 : props.words.length;

            const newMap = new Map<number, string>([]);

            while (newMap.size < maxSize) {
                const num = Math.floor(
                    Math.random() * (props.words.length - 1)
                );
                if (!newMap.has(num)) {
                    newMap.set(num, "");
                }
            }
            inputMap = newMap;
        }

        watch(
            () => props.isOpen,
            (isOpen: boolean, oldIsOpen: boolean) => {
                if (isOpen && !oldIsOpen) {
                    state.focused = null;
                    randomizeEmpties();
                }
            }
        );

        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", isOpen);
        }

        function isDisabled(index: number): boolean {
            return !inputMap.has(index);
        }

        function valueForIndex(index: number): string {
            return isDisabled(index)
                ? props.words[index]
                : inputMap.get(index) || "";
        }

        function handleVerify(): void {
            for (const [index, value] of inputMap.entries()) {
                if (props.words[index] !== value) {
                    store.dispatch(ALERT, {
                        message: "Memonic does not match",
                        level: "error"
                    });

                    return;
                }
            }

            context.emit("success");
        }

        function handleFocus(event: Event): void {
            const target = event.target as HTMLInputElement;
            const index = Number.parseInt(target.dataset.index || "0", 10);

            if (!isDisabled(index)) {
                state.focused = index;
            }
        }

        function handleInput(event: Event): void {
            const target = event.target as HTMLInputElement;
            const index = Number.parseInt(target.dataset.index || "0", 10);

            inputMap.set(index, target.value);
        }

        return {
            state,
            handleModalChangeIsOpen,
            valueForIndex,
            handleVerify,
            isDisabled,
            handleFocus,
            handleInput
        };
    }
});
</script>

<style scoped lang="postcss">
.mnemonic {
    align-items: center;
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
    margin-block-end: 40px;
    margin-block-start: 20px;

    @media (max-width: 414px) {
        grid-template-columns: 1fr 1fr;
    }
}

label {
    align-items: center;
    border-bottom: 1px solid var(--color-admiralty);
    color: var(--color-admiralty);
    display: flex;
    font-size: 14px;
    padding: 10px 0;

    &.readonly {
        border-color: var(--color-jupiter);
        color: var(--color-basalt-grey);
    }

    &.is-focused {
        border-color: var(--color-melbourne-cup);
    }
}

.number {
    flex-shrink: 0;
    font-size: 14px;
}

label.is-focused .number {
    color: var(--color-melbourne-cup);
}

.word {
    border: none;
    color: var(--color-ghostlands-coal);
    margin-inline-start: 10px;
    outline: none;
    padding: 0;
    width: 100%;

    &:read-only {
        cursor: default;
    }
}

.btn-container {
    display: flex;
    justify-content: center;
}

.prompt {
    color: var(--color-china-blue);
    font-size: 14px;
    margin-block-end: 30px;
}
</style>
