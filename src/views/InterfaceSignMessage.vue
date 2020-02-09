<template>
    <InterfaceForm :title="$t('interfaceSignMessage.title')">
        <div class="description">
            {{ $t("interfaceSignMessage.includeYourNickname") }}
        </div>

        <div class="text-input-container">
            <TextInput
                v-model="state.message"
                :label="$t('common.message')"
                type="text"
                :error="
                    state.enableErr ? 'The message field is required' : null
                "
                multiline
            />
        </div>

        <template v-slot:footer>
            <Button
                :disabled="!state.signable"
                :label="$t('interfaceSignMessage.sign')"
                @click="onSignClicked"
            />
        </template>
        <ModalConfirmSignMessage
            :message="state.message"
            public-key="302a300506032b65700321002cc9e2d0c16c717476d4bbbfa3307a98cf0c41d7afc77c851e476b5921f3fb65"
            :is-open="state.confirmSignIsOpen"
            @change="handleConfirmModalChanged"
            @confirm="handleConfirmModalConfirm"
        />
        <!-- value should be a json thing, not `message` -->
        <ModalMessageSigned
            :is-open="state.signedModalIsOpen"
            :value="state.message"
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
import { createComponent, reactive, watch } from "@vue/composition-api";

interface State {
    message: string | null;
    signable: boolean;
    enableErr: boolean;
    confirmSignIsOpen: boolean;
    signedModalIsOpen: boolean;
}

export default createComponent({
    name: "InterfaceSignMessage",
    components: {
        InterfaceForm,
        TextInput,
        Button,
        ModalConfirmSignMessage,
        ModalMessageSigned
    },
    props: {},
    setup() {
        const state = reactive<State>({
            message: null,
            signable: true,
            enableErr: false,
            confirmSignIsOpen: false,
            signedModalIsOpen: false
        });

        function onSignClicked(): void {
            state.confirmSignIsOpen = true;
        }

        function handleSignedModalChanged(value: boolean): void {
            state.signedModalIsOpen = value;
        }

        function handleConfirmModalChanged(value: boolean): void {
            state.confirmSignIsOpen = value;
        }

        function handleConfirmModalConfirm(): void {
            state.confirmSignIsOpen = false;
            state.signedModalIsOpen = true;
        }

        watch(
            () => state.message,
            (val) => {
                state.signable = val != null;
                state.enableErr = val === "";
            }
        );

        return {
            state,
            onSignClicked,
            handleSignedModalChanged,
            handleConfirmModalChanged,
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
