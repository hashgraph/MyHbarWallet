<template>
  <Modal
    :is-open="isOpen"
    :title="$t('modalMessageSigned.title')"
    @change="this.$listeners.change"
  >
    <!-- fixme: either bind this to save edits or make it non-editable -->
    <TextInput
      ref="input"
      :label="$t('modalMessageSigned.signedMessage')"
      :value="value"
      can-copy
      multiline
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
import { createComponent } from "@vue/composition-api";

import { writeToClipboard } from "../clipboard";

import Modal from "./Modal.vue";
import Button from "./Button.vue";
import TextInput from "./TextInput.vue";

export default createComponent({
    name: "ModalMessageSigned",
    components: {
        Button,
        Modal,
        TextInput
    },
    props: {
        isOpen: Boolean,
        value: String
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
