<template>
    <div class="verify-message">
        <InterfaceForm :title="$t('interfaceVerifyMessage.title')">
            <TextInput
                v-model.trim="signature"
                :label="$t('interfaceVerifyMessage.signature')"
                can-copy
                can-clear
                multiline
            />

            <template v-slot:footer>
                <Button
                    :label="$t('interfaceVerifyMessage.verifyMessage')"
                    :disabled="!isValid"
                    :busy="busy"
                />
            </template>
        </InterfaceForm>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "@vue/composition-api";
import InterfaceForm from "../components/InterfaceForm.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";

export default defineComponent({
    components: {
        InterfaceForm,
        TextInput,
        Button
    },
    props: {},
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
