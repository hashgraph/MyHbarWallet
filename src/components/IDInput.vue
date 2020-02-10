<template>
  <TextInput
    ref="input"
    :can-copy="canCopy"
    :compact="compact"
    :error="state.errorMessage"
    :label="label"
    :placeholder="placeholderText"
    :valid="valid || partialValid"
    :value="state.input"
    show-validation
    @click.native.stop
    @input="handleInput"
  />
</template>

<script lang="ts">
import { computed, createComponent, reactive, ref, watch } from "@vue/composition-api";
import Vue from "vue";

import TextInput from "../components/TextInput.vue";

// Shim for using this component programmatically
export type IdInputElement = Vue & {
    clear(): void;
};

interface State {
    input: string;
    errorMessage: string | null;
    // eslint-disable-next-line sonarjs/no-duplicate-string
    account: import("@hashgraph/sdk").AccountId | null;
    file: import("@hashgraph/sdk").FileId | null;
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
    name: "IDInput",
    components: { TextInput },
    props: {
        isOpen: Boolean,
        error: String,
        canCopy: Boolean,
        label: String,
        file: Boolean,
        compact: Boolean,
        placeholder: String
    },
    setup(props, context) {
        const state = reactive<State>({
            input: "",
            errorMessage: null,
            account: null,
            file: null
        });
        const shardRealmAccountRegex = /^\d+\.\d+\.\d+$/u;
        const partialRegex = /^[1-9]\d*$/u;

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

        // eslint-disable-next-line sonarjs/cognitive-complexity
        async function handleInput(accountText: string): Promise<void> {
            state.errorMessage = null;
            state.input = accountText;

            const { AccountId, FileId } = await import("@hashgraph/sdk");

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
                    state.file = FileId.fromString(`${parts[ 0 ]}.
                         ${parts[ 1 ]}.
                         ${parts[ 2 ]}`);
                } else {
                    state.account = AccountId.fromString(`${parts[ 0 ]}.
                         ${parts[ 1 ]}.
                         ${parts[ 2 ]}`);
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
                    state.file = FileId.fromString(`0.0.${parseInt(state.input, 10)}`);
                } else {
                    state.account = AccountId.fromString(`0.0.${parseInt(state.input, 10)}`);
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
