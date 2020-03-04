<template>
    <InterfaceForm :title="$t('interfaceContractDeploy.title')">
        <TextInput
            compact
            can-copy
            can-clear
            multiline
            :label="$t('interfaceContractDeploy.byteCode')"
            class="deploy-contract-form-item"
            show-validation
            :valid="state.byteCodeIsValid"
        />

        <TextInput
            can-copy
            can-clear
            multiline
            :label="'ABI/JSON' + $t('interfaceContractDeploy.interface')"
            class="deploy-contract-form-item"
            show-validation
            :valid="state.interfaceIsValid"
        />

        <TextInput
            :label="$t('interfaceContractDeploy.maximumTransactionFee')"
            class="deploy-contract-form-item"
            show-validation
            :valid="state.maxFeeIsValid"
        />

        <template v-slot:footer>
            <Button
                :disabled="!signable"
                :label="$t('interfaceContractDeploy.signTransaction')"
            />
        </template>
    </InterfaceForm>
</template>

<script lang="ts">
import InterfaceForm from "../components/InterfaceForm.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";

import { defineComponent, reactive, computed } from "@vue/composition-api";

interface State {
    byteCodeIsValid: boolean;
    interfaceIsValid: boolean;
    maxFeeIsValid: boolean;
}

export default defineComponent({
    components: {
        InterfaceForm,
        TextInput,
        Button
    },
    props: {},
    setup() {
        const state = reactive<State>({
            byteCodeIsValid: false,
            interfaceIsValid: false,
            maxFeeIsValid: false
        });

        const signable = computed((): boolean => state.byteCodeIsValid &&
                state.interfaceIsValid &&
                state.maxFeeIsValid);

        return { state, signable };
    }
});
</script>
