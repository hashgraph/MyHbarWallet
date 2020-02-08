<template>
  <div class="verify-message">
    <InterfaceForm :title="$t('interfaceVerifyMessage.title')">
      <TextInput
        v-model.trim="signature"
        :label="$t('interfaceVerifyMessage.signature')"
        can-clear
        can-copy
        multiline
      />

      <template v-slot:footer>
        <Button
          :busy="busy"
          :disabled="!isValid"
          :label="$t('interfaceVerifyMessage.verifyMessage')"
        />
      </template>
    </InterfaceForm>
  </div>
</template>

<script lang="ts">
import { computed, createComponent, reactive } from "@vue/composition-api";

import InterfaceForm from "../components/InterfaceForm.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";

export default createComponent({
    name: "InterfaceVerifyMessage",
    components: {
        InterfaceForm,
        TextInput,
        Button
    },
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
