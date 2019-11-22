<template>
  <TextInput
    ref="input"
    :value="state.input"
    show-validation
    :can-copy="canCopy"
    :label="label"
    :valid="valid || partialValid"
    :error="state.errorMessage"
    :placeholder="
      file ? 'shard.realm.file or file' : $t('common.accountSyntax')
    "
    @input="handleInput"
    @click.native.stop
  />
</template>

<script lang="ts">
import {
    createComponent,
    reactive,
    computed,
    ref,
    PropType,
    watch
} from "@vue/composition-api";
import TextInput from "../components/TextInput.vue";
import { Id } from "../store/modules/wallet";
import Vue from "vue";

interface State {
    input: string;
    errorMessage: string | null;
    account: Id | null;
    file: { shard: number; realm: number; file: number } | null;
}

export interface Props {
    isOpen: boolean;
    error: string | null;
    canCopy: boolean;
    label: string;
    file: boolean;
}

export default createComponent({
    components: { TextInput },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>,
        error: (String as unknown) as PropType<string>,
        canCopy: (Boolean as unknown) as PropType<boolean>,
        label: (String as unknown) as PropType<string>,
        file: (Boolean as unknown) as PropType<boolean>
    },
    setup(props, context) {
        const state = reactive<State>({
            input: "",
            errorMessage: null,
            account: null,
            file: null
        });
        const shardRealmAccountRegex = /^\d+\.\d+\.\d+$/u;
        const partialRegex = /^[1-9]{1}\d{0,}$/u;

        const valid = computed(() => shardRealmAccountRegex.test(state.input));
        const partialValid = computed(() => partialRegex.test(state.input));

        const input = ref<HTMLInputElement | null>(null);

        function handleInput(accountText: string): void {
            state.errorMessage = null;
            state.input = accountText;
            if (valid.value) {
                const parts = state.input.split(".");
                if (props.file !== null) {
                    state.file = {
                        shard: parseInt(parts[ 0 ], 10),
                        realm: parseInt(parts[ 1 ], 10),
                        file: parseInt(parts[ 2 ], 10)
                    };
                } else {
                    state.account = {
                        shard: parseInt(parts[ 0 ], 10),
                        realm: parseInt(parts[ 1 ], 10),
                        account: parseInt(parts[ 2 ], 10)
                    };
                }
            } else if (partialValid.value) {
                if (props.file !== null) {
                    state.file = {
                        shard: parseInt("0", 10),
                        realm: parseInt("0", 10),
                        file: parseInt(state.input, 10)
                    };
                } else {
                    state.account = {
                        shard: parseInt("0", 10),
                        realm: parseInt("0", 10),
                        account: parseInt(state.input, 10)
                    };
                }
            } else {
                state.account = null;
            }
            if (props.file !== null) {
                context.emit("input", state.input, state.file);
            } else {
                context.emit("input", state.input, state.account);
            }
            context.emit("valid", valid.value || partialValid.value);
        }

        watch(
            () => props.error,
            (newVal) => {
                if (typeof newVal !== "undefined" && props.error !== null) state.errorMessage = props.error as string;
            }
        );

        watch(
            () => props.isOpen,
            (newVal) => {
                // input.value is not set until after modal is open
                Vue.nextTick(() => {
                    if (newVal === true && input.value !== null) {
                        // Clear input every time we reopen this modal
                        clear();
                        input.value.focus();
                    }
                });
            }
        );

        function clear(): void {
            state.input = "";
        }

        return {
            clear,
            state,
            valid,
            partialValid,
            handleInput,
            input
        };
    }
});
</script>
