<template>
    <TextInput
        ref="input"
        :value="state.input"
        show-validation
        :can-copy="canCopy"
        :label="label"
        :valid="valid || partialValid"
        :error="state.errorMessage"
        :placeholder="$t('common.accountSyntax')"
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

interface State {
    input: string;
    errorMessage: string | null;
    account: Id | null;
}

export interface Props {
    isOpen: boolean;
    errorMessage: string | null;
    canCopy: boolean;
    label: string;
}

export default createComponent({
    components: {
        TextInput
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>,
        errorMessage: (String as unknown) as PropType<string>,
        canCopy: (Boolean as unknown) as PropType<boolean>,
        label: (String as unknown) as PropType<string>
    },
    setup(props, context) {
        const state = reactive<State>({
            input: "",
            errorMessage: null,
            account: null
        });
        const shardRealmAccountRegex = /^\d+\.\d+\.\d+$/;
        const partialRegex = /^[1-9]{1,}$/;

        const valid = computed(() => shardRealmAccountRegex.test(state.input));
        const partialValid = computed(() => partialRegex.test(state.input));

        const input = ref<HTMLInputElement | null>(null);

        function handleInput(accountText: string, event: Event): void {
            state.errorMessage = null;
            state.input = accountText;
            if (valid.value) {
                const parts = state.input.split(".");
                state.account = {
                    shard: parseInt(parts[0]),
                    realm: parseInt(parts[1]),
                    account: parseInt(parts[2])
                };
            } else if (partialValid.value) {
                state.account = {
                    shard: parseInt("0"),
                    realm: parseInt("0"),
                    account: parseInt(state.input)
                };
            } else {
                state.account = null;
            }

            context.emit("input", input.value, state.account);
            context.emit("valid", valid.value || partialValid.value);
        }

        watch(
            () => props.errorMessage,
            newVal => {
                if (newVal && props.errorMessage)
                    state.errorMessage = props.errorMessage;
            }
        );

        watch(
            () => props.isOpen,
            newVal => {
                if (newVal && input.value) {
                    // Clear input every time we reopen this modal
                    state.input = "";
                    input.value.focus();
                }
            }
        );

        return {
            state,
            valid,
            partialValid,
            handleInput,
            input
        };
    }
});
</script>
