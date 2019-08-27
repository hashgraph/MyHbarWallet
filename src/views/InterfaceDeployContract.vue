<template>
    <InterfaceForm title="Deploy Contract">
        <TextInput
            compact
            can-copy
            can-clear
            multiline
            label="Byte Code"
            class="deploy-contract-form-item"
            show-validation
            :valid="state.byteCodeIsValid"
        />

        <TextInput
            can-copy
            can-clear
            multiline
            label="ABI/JSON Interface"
            class="deploy-contract-form-item"
            show-validation
            :valid="state.interfaceIsValid"
        />

        <TextInput
            label="Maximum Transaction Fee"
            class="deploy-contract-form-item"
            show-validation
            :valid="state.maxFeeIsValid"
        />

        <template v-slot:footer>
            <Button :disabled="!signable" label="Sign Transaction" />
        </template>
    </InterfaceForm>
</template>

<script lang="ts">
import InterfaceForm from "../components/InterfaceForm.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";

import { createComponent, reactive, computed } from "@vue/composition-api";

interface State {
    byteCodeIsValid: boolean;
    interfaceIsValid: boolean;
    maxFeeIsValid: boolean;
}

export default createComponent({
    components: {
        InterfaceForm,
        TextInput,
        Button
    },
    setup() {
        const state = reactive<State>({
            byteCodeIsValid: false,
            interfaceIsValid: false,
            maxFeeIsValid: false
        });

        const signable = computed(
            (): boolean =>
                state.byteCodeIsValid &&
                state.interfaceIsValid &&
                state.maxFeeIsValid
        );

        return { state, signable };
    }
});
</script>
