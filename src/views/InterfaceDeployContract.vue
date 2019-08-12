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
            :valid="byteCodeIsValid"
        />
        <TextInput
            can-copy
            can-clear
            multiline
            label="ABI/JSON Interface"
            class="deploy-contract-form-item"
            show-validation
            :valid="interfaceIsValid"
        />
        <TextInput
            label="Maximum Transaction Fee"
            class="deploy-contract-form-item"
            show-validation
            :valid="maxFeeIsValid"
        />

        <div class="deploy-contract-form-footer">
            <Button :disabled="!signable" label="Sign Transaction" />
        </div>
    </InterfaceForm>
</template>

<script lang="ts">
import InterfaceForm from "../components/InterfaceForm.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";

import { createComponent, value as vueValue, computed } from "vue-function-api";

export default createComponent({
    components: {
        InterfaceForm,
        TextInput,
        Button
    },
    setup() {
        const byteCodeIsValid = vueValue(false);
        const interfaceIsValid = vueValue(false);
        const maxFeeIsValid = vueValue(false);

        const signable = computed(
            (): boolean =>
                byteCodeIsValid.value &&
                interfaceIsValid.value &&
                maxFeeIsValid.value
        );

        return { byteCodeIsValid, interfaceIsValid, maxFeeIsValid, signable };
    }
});
</script>

<style lang="postcss" scoped>
.deploy-contract-form-item {
    margin-block-end: 30px;
}

.deploy-contract-form-footer {
    align-items: center;
    display: flex;
    flex-direction: column;
}

a {
    color: var(--color-melbourne-cup);
    cursor: pointer;
    text-decoration: none;
}

a:hover,
a:focus {
    text-decoration: underline;
}
</style>
