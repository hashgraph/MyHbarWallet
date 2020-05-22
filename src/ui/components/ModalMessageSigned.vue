<template>
    <Modal
        :title="$t('modalMessageSigned.title')"
        :is-open="isOpen"
        @change="this.$listeners.change"
    >
        <TextInput
            ref="input"
            :key="compKey"
            :label="$t('modalMessageSigned.signedMessage')"
            can-copy
            multiline
            :value="value"
        />

        <div class="button-container">
            <Button
                :label="$t('common.copy')"
                @click="handleClickCopy"
            />
        </div>
    </Modal>
</template>
<script lang="ts">
import { defineComponent, PropType, Ref, ref } from "@vue/composition-api";

import { writeToClipboard } from "../../service/clipboard";

import Modal from "./Modal.vue";
import Button from "./Button.vue";
import TextInput from "./TextInput.vue";

export default defineComponent({
    components: {
        Modal,
        Button,
        TextInput
    },
    props: {
        isOpen: Boolean as PropType<boolean>,
        value: String as PropType<string>
    },
    setup(
        props: {
            isOpen: boolean;
            value: string;
        },
        context
    ) {
        const input: Ref<HTMLElement | null> = ref(null);
        const compKey = ref(0);

        async function handleClickCopy(): Promise<void> {
            compKey.value += 1;
            context.root.$nextTick(() => {
                if (input.value != null) {
                    writeToClipboard(input.value);
                    context.emit("change", false);
                }
            });
        }

        return { input, compKey, handleClickCopy };
    }
});
</script>

<style lang="postcss" scoped>
.button-container {
    display: flex;
    justify-content: center;
    margin-block-start: 30px;
}
</style>
