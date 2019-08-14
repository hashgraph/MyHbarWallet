<template>
    <div class="verify-message">
        <InterfaceForm title="Verify Message">
            <TextInput
                v-model.trim="signature"
                label="Signature"
                can-copy
                can-clear
                multiline
            />

            <template v-slot:footer>
                <Button
                    label="Verify Message"
                    :disabled="!isValid"
                    :busy="busy"
                />
            </template>
        </InterfaceForm>
    </div>
</template>

<script lang="ts">
import { computed, createComponent, value } from "vue-function-api";
import InterfaceForm from "@/components/InterfaceForm.vue";
import TextInput from "@/components/TextInput.vue";
import Button from "@/components/Button.vue";

export default createComponent({
    components: {
        InterfaceForm,
        TextInput,
        Button
    },
    setup() {
        const signature = value("");
        const busy = value(false);

        const isValid = computed(() => signature.value.length !== 0);

        return {
            signature,
            busy,
            isValid
        };
    }
});
</script>
