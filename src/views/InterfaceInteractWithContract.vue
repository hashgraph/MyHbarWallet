<template>
    <div class="interact-with-contract">
        <InterfaceForm title="Interact With Contract">
            <TextInput
                label="Contract ID"
                placeholder="Enter Contract ID"
                show-validation
                :valid="isIdValid"
                :value="contractId"
                @input="handleContractIdInput"
            />
            <div class="space" />
            <TextInput
                label="ABI/JSON Interface"
                can-copy
                can-clear
                multiline
                show-validation
                :valid="isJsonValid"
                :value="abi"
                @input="handleAbiInput"
            />
            <div class="form-footer">
                <Button
                    label="Continue"
                    :trailing-icon="arrowRight"
                    :disabled="!isFormValid"
                />
            </div>
        </InterfaceForm>
    </div>
</template>

<script lang="ts">
import { computed, createComponent, value, watch } from "vue-function-api";
import InterfaceForm from "@/components/InterfaceForm.vue";
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";
import { mdiArrowRight } from "@mdi/js";

export default createComponent({
    components: {
        InterfaceForm,
        TextInput,
        Button
    },
    setup() {
        const contractId = value("");
        const abi = value("");
        const isJsonValid = value(false);
        const isIdValid = value(false);

        const arrowRight = computed(() => mdiArrowRight);
        const isFormValid = computed(
            () => isIdValid.value && isJsonValid.value
        );

        function handleContractIdInput(value: string) {
            contractId.value = value.trim();
        }

        function handleAbiInput(value: string) {
            abi.value = value.trim();
        }

        // Watch contract ID and validate it!
        watch(
            () => contractId.value,
            value => {
                isIdValid.value = value.match(/\d+\.\d+\.\d+/gm) != null;
            }
        );

        // Watch json and validate it!
        watch(
            () => abi.value,
            value => {
                try {
                    JSON.parse(value);
                    isJsonValid.value = true;
                } catch (error) {
                    isJsonValid.value = false;
                }
            }
        );

        return {
            contractId,
            abi,
            isIdValid,
            isJsonValid,
            arrowRight,
            isFormValid,
            handleContractIdInput,
            handleAbiInput
        };
    }
});
</script>

<style lang="postcss" scoped>
.form-footer {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-block-start: 60px;
}

.space {
    padding-block-end: 30px;
}
</style>
