<template>
  <InterfaceForm :title="$t('interfaceContractDeploy.title')">
    <TextInput
      :label="$t('interfaceContractDeploy.byteCode')"
      :valid="state.byteCodeIsValid"
      can-clear
      can-copy
      class="deploy-contract-form-item"
      compact
      multiline
      show-validation
    />

    <TextInput
      :label="'ABI/JSON' + $t('interfaceContractDeploy.interface')"
      :valid="state.interfaceIsValid"
      can-clear
      can-copy
      class="deploy-contract-form-item"
      multiline
      show-validation
    />

    <TextInput
      :label="$t('interfaceContractDeploy.maximumTransactionFee')"
      :valid="state.maxFeeIsValid"
      class="deploy-contract-form-item"
      show-validation
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
import { computed, createComponent, reactive } from "@vue/composition-api";

import InterfaceForm from "../components/InterfaceForm.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";

interface State {
    byteCodeIsValid: boolean;
    interfaceIsValid: boolean;
    maxFeeIsValid: boolean;
}

export default createComponent({
    props: {}, // ts hack
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

        const signable = computed((): boolean => state.byteCodeIsValid &&
                state.interfaceIsValid &&
                state.maxFeeIsValid);

        return { state, signable };
    }
});
</script>
