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
import { computed, createComponent, value } from "vue-function-api";
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
        const contractIdRegex = /^\d+\.\d+\.\d+$/;
        const contractId = value("");
        const abi = value("");

        const isIdValid = computed(() => {
            const matches = contractId.value.match(contractIdRegex);
            return matches != null && matches.length == 1;
        });
        const isJsonValid = computed(() => {
            try {
                JSON.parse(abi.value);
                return true;
            } catch (error) {
                return false;
            }
        });
        const isFormValid = computed(
            () => isIdValid.value && isJsonValid.value
        );
        const arrowRight = computed(() => mdiArrowRight);

        function handleContractIdInput(value: string) {
            contractId.value = value.trim();
        }

        function handleAbiInput(value: string) {
            abi.value = value.trim();
        }

        return {
            contractIdRegex,
            contractId,
            abi,
            isIdValid,
            isJsonValid,
            isFormValid,
            arrowRight,
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
