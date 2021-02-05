<template>
    <Modal
        :is-open="isOpen"
        :title="title"
        @change="this.$listeners.change"
    >
        <div
            v-show="hasPublicKey"
            class="key-container public"
        >
            <div
                class="subtitle"
                v-text="$t('modalViewKeys.publicKey')"
            />
            <ReadOnlyInput
                ref="publicInput"
                :key="publicCompKey"
                class="input"
                :value="publicKey"
                multiline
            />
            <Button
                :label="$t('modalViewKeys.copyPublic')"
                class="button"
                compact
                @click="handleCopyPublicKey"
            />
        </div>
        <div
            v-show="hasPrivateKey"
            class="key-container private"
        >
            <div
                class="subtitle"
                v-text="$t('modalViewKeys.privateKey')"
            />
            <ReadOnlyInput
                ref="privateInput"
                :key="privateCompKey"
                class="input"
                :value="privateKey"
                multiline
                obscure
            />
            <Button
                :label="$t('modalViewKeys.copyPrivate')"
                class="button"
                compact
                @click="handleCopyPrivateKey"
            />
        </div>
    </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext, Ref, ref } from "@vue/composition-api";

import { writeToClipboard } from "../../service/clipboard";
import { actions } from "../store";

import Modal from "./Modal.vue";
import ReadOnlyInput from "./ReadOnlyInput.vue";
import Button from "./Button.vue";

interface Props {
    isOpen: boolean;
    privateKey: string;
    publicKey: string;
}

export default defineComponent({
    name: "ModalViewKeys",
    components: {
        Modal,
        ReadOnlyInput,
        Button
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: Boolean,
        privateKey: String,
        publicKey: String
    },
    setup(props: Props, context: SetupContext) {
        const publicInput: Ref<HTMLElement | null> = ref(null);
        const publicCompKey = ref(0);
        const privateInput: Ref<HTMLElement | null> = ref(null);
        const privateCompKey = ref(0);

        const hasPrivateKey = computed(() => props.privateKey !== "" && props.privateKey != null);
        const hasPublicKey = computed(() => props.publicKey !== "" && props.publicKey != null);

        const title = computed(() => {
            if (hasPrivateKey.value && hasPublicKey.value) {
                return context.root.$t("modalViewKeys.title");
            } else if (hasPublicKey.value) {
                return context.root.$t("modalViewKeys.publicKey");
            } else if (hasPrivateKey.value) {
                return context.root.$t("modalViewKeys.privateKey");
            }
            return "";
        });

        async function handleCopyPublicKey(): Promise<void> {
            publicCompKey.value += 1;
            context.root.$nextTick(() => {
                if (publicInput.value != null) {
                    writeToClipboard(publicInput.value);

                    actions.alert({
                        level: "info",
                        message: context.root
                            .$t("modalViewKeys.copiedPublic")
                            .toString()
                    });
                }
            });
        }

        async function handleCopyPrivateKey(): Promise<void> {
            privateCompKey.value += 1;
            context.root.$nextTick(() => {
                if (privateInput.value != null) {
                    writeToClipboard(privateInput.value);

                    actions.alert({
                        level: "info",
                        message: context.root
                            .$t("modalViewKeys.copiedPrivate")
                            .toString()
                    });
                }
            });
        }

        return {
            publicInput,
            publicCompKey,
            privateInput,
            privateCompKey,
            title,
            hasPrivateKey,
            hasPublicKey,
            handleCopyPublicKey,
            handleCopyPrivateKey
        };
    }
});
</script>

<style lang="postcss" scoped>
.key-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    &.private {
        padding-block-start: 40px;
    }
}

.subtitle {
    color: var(--color-china-blue);
    font-size: 24px;
    text-align: center;
}

.input {
    margin-block-start: 30px;
}

.button {
    margin-block-start: 30px;
    width: 100%;
}
</style>
