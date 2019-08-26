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
            <Button :disabled="!signable" label="Sign" @click="onSignClicked" />
        </template>
        <ModalConfirmSignMessage
            :message="message"
            public-key="302a300506032b65700321002cc9e2d0c16c717476d4bbbfa3307a98cf0c41d7afc77c851e476b5921f3fb65"
            :is-open="confirmSignIsOpen"
            @change="handleConfirmModalChanged"
            @confirm="handleConfirmModalConfirm"
        />
        <!-- value should be a json thing, not `message` -->
        <ModalMessageSigned
            :is-open="signedModalIsOpen"
            :value="message"
            @change="handleSignedModalChanged"
        />
    </InterfaceForm>
</template>

<script lang="ts">
import InterfaceForm from "../components/InterfaceForm.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import ModalConfirmSignMessage from "../components/ModalConfirmSignMessage.vue";
import ModalMessageSigned from "../components/ModalMessageSigned.vue";
import { createComponent, watch, value } from "@vue/composition-api";

export default createComponent({
    name: "InterfaceSignMessage",
    components: {
        InterfaceForm,
        TextInput,
        Button,
        ModalConfirmSignMessage,
        ModalMessageSigned
    },
    setup() {
        const message = value(null);
        const signable = value(true);
        const enableErr = value(false);
        const confirmSignIsOpen = value(false);
        const signedModalIsOpen = value(false);
        function onSignClicked() {
            confirmSignIsOpen.value = true;
        }

        function handleSignedModalChanged(value: boolean) {
            signedModalIsOpen.value = value;
        }

        function handleConfirmModalChanged(value: boolean) {
            confirmSignIsOpen.value = value;
        }

        function handleConfirmModalConfirm() {
            confirmSignIsOpen.value = false;
            signedModalIsOpen.value = true;
        }

        watch(
            () => message.value,
            val => {
                if (val) signable.value = true;
                else signable.value = false;

                if (val === "") enableErr.value = true;
                else enableErr.value = false;
            }
        );

        return {
            message,
            signable,
            enableErr,
            onSignClicked,
            confirmSignIsOpen,
            signedModalIsOpen,
            handleConfirmModalChanged,
            handleSignedModalChanged,
            handleConfirmModalConfirm
        };
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
