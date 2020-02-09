<template>
    <TextInput
        ref="input"
        :value="state.input"
        show-validation
        :can-copy="canCopy"
        :label="label"
        :valid="valid || partialValid"
        :error="state.errorMessage"
        :placeholder="placeholderText"
        :compact="compact"
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
import Vue from "vue";
import { AccountId, FileId } from "@hashgraph/sdk";

// Shim for using this component programmatically
export type IdInputElement = Vue & {
    clear(): void;
};

interface State {
    input: string;
    errorMessage: string | null;
    account: AccountId | null;
    file: FileId | null;
}

export interface Props {
    isOpen: boolean;
    error: string | null;
    canCopy: boolean;
    label: string;
    file: boolean;
    compact: boolean | null;
}

export default createComponent({
    components: { TextInput },
    props: {
        isOpen: Boolean,
        error: String,
        canCopy: Boolean,
        label: String,
        file: Boolean,
        compact: Boolean,
        placeholder: (String as unknown) as PropType<string | null | undefined>
    },
    setup(props, context) {
        const state = reactive<State>({
            input: "",
            errorMessage: null,
            account: null,
            file: null
        });
        const shardRealmAccountRegex = /^\d+\.\d+\.\d+$/;
        const partialRegex = /^[1-9]\d*$/;

        const valid = computed(() => shardRealmAccountRegex.test(state.input));
        const partialValid = computed(() => partialRegex.test(state.input));

        const input = ref<HTMLInputElement | null>(null);

        const placeholderText = computed(() => {
            if (props.placeholder != null) {
                return props.placeholder;
            }
            return props.file ?
                context.root.$t("common.fileSyntax") :
                context.root.$t("common.accountSyntax");
        });

        function handleInput(accountText: string): void {
            state.errorMessage = null;
            state.input = accountText;
            if (valid.value) {
                const parts = state.input.split(".");

                // Check that each ID part is a safe integer
                // TO DO: Use BigInts
                if (
                    parts[ 0 ].length > 8 ||
                    parts[ 1 ].length > 8 ||
                    parts[ 2 ].length > 8
                ) {
                    state.errorMessage = context.root
                        .$t("common.idTooBig")
                        .toString();
                    return;
                }

                if (props.file) {
                    state.file = {
                        shard: parseInt(parts[ 0 ]),
                        realm: parseInt(parts[ 1 ]),
                        file: parseInt(parts[ 2 ])
                    };
                } else {
                    state.account = {
                        shard: parseInt(parts[ 0 ]),
                        realm: parseInt(parts[ 1 ]),
                        account: parseInt(parts[ 2 ])
                    };
                }
            } else if (partialValid.value) {
                // Check that each ID part is a safe integer
                // TO DO: Use BigInts
                if (state.input.length > 8) {
                    state.errorMessage = context.root
                        .$t("common.idTooBig")
                        .toString();
                    return;
                }
                if (props.file) {
                    state.file = {
                        shard: parseInt("0"),
                        realm: parseInt("0"),
                        file: parseInt(state.input)
                    };
                } else {
                    state.account = {
                        shard: parseInt("0"),
                        realm: parseInt("0"),
                        account: parseInt(state.input)
                    };
                }
            } else {
                state.account = null;
            }
            if (props.file) {
                context.emit("input", state.input, state.file);
            } else {
                context.emit("input", state.input, state.account);
            }
            context.emit("valid", valid.value || partialValid.value);
        }

        watch(
            () => props.error,
            (newVal) => {
                if (newVal && props.error) state.errorMessage = props.error;
            }
        );

        watch(
            () => props.isOpen,
            (newVal) => {
                // input.value is not set until after modal is open
                Vue.nextTick(() => {
                    if (newVal && input.value) {
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
            input,
            placeholderText
        };
    }
});
</script>
