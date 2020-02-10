<template>
  <div class="interact-with-contract">
    <InterfaceForm :title="$t('interfaceInteractWithContract.title')">
      <TextInput
        v-model.trim="contractId"
        :label="$t('common.contract')"
        :placeholder="$t('common.accountSyntax')"
        :valid="isIdValid"
        show-validation
      />
      <TextInput
        v-model.trim="abi"
        :label="'ABI/JSON' + $t('common.interface')"
        :valid="isJsonValid"
        can-clear
        can-copy
        multiline
        show-validation
      />

      <template v-slot:footer>
        <Button
          :disabled="!isFormValid"
          :label="$t('common.continue')"
          :trailing-icon="arrowRight"
        />
      </template>
    </InterfaceForm>
  </div>
</template>

<script lang="ts">
import { computed, createComponent, reactive } from "@vue/composition-api";
import { mdiArrowRight } from "@mdi/js";

import InterfaceForm from "../components/InterfaceForm.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";

export default createComponent({
    props: {}, // ts hack
    components: {
        InterfaceForm,
        TextInput,
        Button
    },
    setup() {
        const arrowRight = mdiArrowRight;
        const idRegex = /^\d+\.\d+\.\d+$/u;

        const state = reactive({
            contractId: "",
            abi: ""
        });

        const isIdValid = computed(() => idRegex.test(state.contractId));

        const isJsonValid = computed(() => {
            try {
                JSON.parse(state.abi);
                return true;
            } catch (error) {
                return false;
            }
        });
        const isFormValid = computed(() => isIdValid.value && isJsonValid.value);

        return {
            arrowRight,
            state,
            isIdValid,
            isJsonValid,
            isFormValid
        };
    }
});
</script>
