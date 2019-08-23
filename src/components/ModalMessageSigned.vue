<template>
    <Modal title="Signature" :is-open="isOpen" @change="this.$listeners.change">
        <!-- fixme: either bind this to save edits or make it non-editable -->
        <TextInput label="Signed Message" can-copy multiline :value="value" />

        <div class="button-container">
            <Button label="Copy" @click="handleClickCopy"></Button>
        </div>
    </Modal>
</template>
<script lang="ts">
import { createComponent, PropType } from "vue-function-api";
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
    setup(props, context) {
        async function handleClickCopy() {
            await writeToClipboard(props.value);
            context.emit("change", false);
        }

        return {
            handleClickCopy
        };
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
