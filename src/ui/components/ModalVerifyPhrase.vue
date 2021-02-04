<template>
    <Modal
        :title="$t('modalVerifyPhrase.title')"
        :is-open="isOpen"
        @change="this.$listeners.change"
    >
        <div class="prompt">
            {{ $t("modalVerifyPhrase.pleaseEnterAndFillOut") }}
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
                        ref="input"
                        class="word"
                        :readonly="isDisabled(index - 1)"
                        :value="valueForIndex(index - 1)"
                        :data-index="index - 1"
                        :tabindex="isDisabled(index - 1) ? -1 : null"
                        @focus="handleFocus"
                        @input="handleInput"
                    >
                </label>
            </div>
            <OptionalPasswordInput
                v-model="state.password"
            />
            <div class="btn-container">
                <Button :label="$t('modalVerifyPhrase.verify')" />
            </div>
        </form>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, SetupContext, watch } from "@vue/composition-api";

import { actions } from "../store";

import Modal from "./Modal.vue";
import Button from "./Button.vue";
import TextInput from "./TextInput.vue";
import OptionalPasswordInput from "./OptionalPasswordInput.vue";

declare const MHW_ENV: string;

interface Props {
    isOpen: boolean;
    words: string[];
    password: string;
}

export default defineComponent({
    name: "ModalVerifyPhrase",
    components: {
        Modal,
        Button,
        TextInput,
        OptionalPasswordInput
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: Boolean,
        words: (Array as unknown) as PropType<string[]>,
        password: String
    },
    setup(props: Props, context: SetupContext) {
        const input = ref<HTMLInputElement[] | null>(null);

        const state = reactive({
            focused: null as number | null,
            inputMap: new Map() as Map<number, string>,
            password: ""
        });

        let firstIndex = 24;

        function randomizeEmpties(): void {
            const maxSize = props.words.length < 5 ? props.words.length : 5;
            const newMap = new Map<number, string>([]);

            // i gets index of first text input for focus
            while (newMap.size < maxSize) {
                const num = Math.floor(Math.random() * (props.words.length - 1));
                if (!newMap.has(num)) {
                    newMap.set(num, "");
                    if (num < firstIndex) firstIndex = num;
                }
            }
            state.inputMap = newMap;
        }

        watch(
            () => props.isOpen,
            (isOpen: boolean, oldIsOpen: boolean) => {
                if (isOpen && !oldIsOpen) {
                    state.focused = null;
                    if (MHW_ENV !== "test") randomizeEmpties();
                }
            }
        );

        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", isOpen);
        }

        function isDisabled(index: number): boolean {
            return !state.inputMap.has(index);
        }

        function valueForIndex(index: number): string {
            return isDisabled(index) ?
                props.words[ index ] :
                state.inputMap.get(index) || "";
        }

        function handleVerify(): void {
            for (const [ index, value ] of state.inputMap.entries()) {
                if (props.words[ index ] !== value) {
                    actions.alert({
                        message: context.root.$t("mnemonic.noMatch").toString(),
                        level: "error"
                    });

                    return;
                }
                if (props.password !== state.password) {
                    actions.alert({
                        message: context.root.$t("mnemonic.passwordMismatch").toString(),
                        level: "error"
                    });

                    return;
                }
            }

            context.emit("success");
        }

        function handleFocus(event: Event): void {
            const target = event.target as HTMLInputElement;
            // eslint-disable-next-line compat/compat
            const index = Number.parseInt(target.dataset.index || "0", 10);

            if (!isDisabled(index)) {
                state.focused = index;
            }
        }

        function handleInput(event: Event): void {
            const target = event.target as HTMLInputElement;
            // eslint-disable-next-line compat/compat
            const index = Number.parseInt(target.dataset.index || "0", 10);

            state.inputMap.set(index, target.value);
        }

        watch(
            () => props.isOpen,
            (newVal: boolean) => {
                if (newVal && input.value) {
                    input.value[ firstIndex ].focus();
                }
            }
        );

        return {
            state,
            handleModalChangeIsOpen,
            valueForIndex,
            handleVerify,
            isDisabled,
            handleFocus,
            handleInput,
            input
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
