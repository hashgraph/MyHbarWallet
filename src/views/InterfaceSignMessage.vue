<template>
    <InterfaceForm title="Sign Message">
        <div class="description">
            Include your nickname and where you use the nickname so someone else
            cannot use it. Include a specific reason for the message so it
            cannot be reused for a different purpose.
        </div>

        <div class="text-input-container">
            <TextInput
                v-model="message"
                label="Message"
                type="text"
                :error="enableErr ? 'The message field is required' : null"
                multiline
            />
        </div>

        <template v-slot:footer>
            <Button
                :disabled="!signable"
                label="Sign"
                @click="$emit('sign', messageText)"
            />
        </template>
    </InterfaceForm>
</template>

<script lang="ts">
import InterfaceForm from "../components/InterfaceForm.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { createComponent, watch, value } from "vue-function-api";

export default createComponent({
    name: "InterfaceSignMessage",
    components: {
        InterfaceForm,
        TextInput,
        Button
    },
    setup() {
        const message = value(null);
        const signable = value(true);
        const enableErr = value(false);

        watch(
            () => message.value,
            val => {
                if (val) signable.value = true;
                else signable.value = false;

                if (val === "") enableErr.value = true;
                else enableErr.value = false;
            }
        );

        return { message, signable, enableErr };
    }
});
</script>

<style lang="postcss" scoped>
.description {
    color: var(--color-china-blue);
    font-size: 14px;
    margin-block-end: 10px;
    padding-inline: 8px;
}
</style>
