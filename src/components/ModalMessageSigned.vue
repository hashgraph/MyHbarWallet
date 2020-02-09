<template>
    <Modal
        :title="$t('modalMessageSigned.title')"
        :is-open="isOpen"
        @change="this.$listeners.change"
    >
        <!-- fixme: either bind this to save edits or make it non-editable -->
        <TextInput
            ref="input"
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
import { createComponent, PropType } from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";
import TextInput from "../components/TextInput.vue";
import { writeToClipboard } from "../clipboard";

export default createComponent({
    components: {
        Modal,
        Button,
        TextInput
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>,
        value: (String as unknown) as PropType<string>
    },
    setup(
        props: {
            isOpen: boolean;
            value: string;
        },
        context
    ) {
        async function handleClickCopy(): Promise<void> {
            await writeToClipboard(props.value);
            context.emit("change", false);
        }

        return { handleClickCopy };
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
