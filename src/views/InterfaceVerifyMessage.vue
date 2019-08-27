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
import { computed, createComponent, reactive } from "@vue/composition-api";
import InterfaceForm from "../components/InterfaceForm.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";

export default createComponent({
    components: {
        InterfaceForm,
        TextInput,
        Button
    },
    setup() {
        const state = reactive({
            signature: "",
            busy: false
        });

        const isValid = computed(() => state.signature.length !== 0);

        return {
            state,
            isValid
        };
    }
});
</script>
