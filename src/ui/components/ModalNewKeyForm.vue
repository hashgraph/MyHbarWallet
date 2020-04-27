<template>
    <Modal
        :is-open="props.isOpen"
        title="New Key Form"
        @change="handleDismiss"
    >
        <div class="container">
            <Notice :symbol="mdiHelpCircleOutline">
                This key or keylist will act as a single signer for the account being created. Threshold here required to be met before this key may act as a signer.
            </Notice>

            <div class="threshold">
                <div class="title">
                    Required number of signers (threshold)
                </div>
                <div class="num-input">
                    <TextInput
                        v-model="props.state.threshold"
                        compact
                        :value="props.state.threshold"
                        :spellcheck-disabled="true"
                        :autocomplete-disabled="true"
                    />
                </div>
                <FlatButton
                    :icon="mdiPlus"
                    @click="handleAddKey"
                />
            </div>
            <div
                v-for="(key, index) in props.state.key"
                :key="index"
            >
                <div class="text-block">
                    <MaterialDesignIcon :icon="mdiKeyVariant" />
                    <TextInput
                        v-model="key.key[0]"
                        compact
                        show-validation
                        :valid="key.isKeyValid"
                        :value="key.key[0]"
                        :spellcheck-disabled="true"
                        :autocomplete-disabled="true"
                        :placeholder="
                            $t('interfaceCreateAccount.publicKey')
                        "
                    />
                    <FlatButton
                        v-if="index !== '0'"
                        :icon="mdiMinus"
                        @click="handleRemoveKey(index)"
                    />
                </div>
            </div>
            <div class="buttons">
                <Button
                    :label="'cancel'"
                    danger
                    compact
                    outline
                    @click="handleDismiss"
                />
                <Button
                    :label="'submit'"
                    compact
                    :disabled="!props.state.areKeysValid"
                    @click="handleSubmit"
                />
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive } from "@vue/composition-api";
import { mdiPlus, mdiMinus, mdiKeyVariant, mdiHelpCircleOutline } from "@mdi/js";

import Notice from "../components/Notice.vue";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import Modal from "./Modal.vue";
import FlatButton from "./FlatButton.vue";
import Button from "./Button.vue";
import TextInput from "./TextInput.vue";
import { Key } from "./PublicKeyRing.vue";

export interface State {
    key: Key[];
    threshold: string;
    areKeysValid: boolean;
    numOfKeys: number;
}

interface Props {
    state: State;
}

export default defineComponent({
    props: { state: (Object as unknown) as PropType<State>, isOpen: Boolean },
    components: { MaterialDesignIcon, TextInput, FlatButton, Modal, Notice, Button },
    model: {
        prop: "state",
        event: "change"
    },
    setup(props: Props, context) {
        function handleRemoveKey(index: number): void {
            context.emit("remove", index);
        }

        function handleSubmit(): void {
            context.emit("submit");
        }

        function handleAddKey(): void {
            context.emit("add");
        }

        function handleDismiss(): void {
            context.emit("dismiss");
        }

        return {
            props,
            mdiPlus,
            mdiMinus,
            mdiKeyVariant,
            mdiHelpCircleOutline,
            handleRemoveKey,
            handleAddKey,
            handleDismiss,
            handleSubmit
        };
    }
});
</script>

<style lang="postcss" scoped>
.container {
    display: flex;
    flex-direction: column;
}

.threshold {
    align-items: center;
    justify-content: space-around;
    display: flex;
    flex-direction: row;
    height: 65px;
    margin-block-end: 10px;
    padding-inline-end: 14px;
    border-bottom: 1px solid var(--color-peral);

    &>.title {
        white-space: nowrap;
        font-size: 12px;
        margin-inline-start: 50px;
    }

    &>.num-input {
        width:50px;
    }
}

.text-block {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-block-end: 20px;
    &>svg {
        margin-inline-end: 10px;
    }
}

.buttons {
    display: flex;
    justify-content: space-around;
    padding-block-start: 20px;
    border-top: 1px solid var(--color-peral);
}
</style>
