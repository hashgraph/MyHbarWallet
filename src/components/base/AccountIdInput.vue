<template>
  <TextInput
    v-model="state.accountString"
    :valid="(!error && state.isValid) ?? false"
    :error="(error || state.hasError) ?? false"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>

<script lang="ts">
import type { AccountId } from "@hashgraph/sdk";
import TextInput from "./TextInput.vue";
import Long from "long";
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  watch,
  PropType,
} from "vue";
import { debouncedWatch } from "@vueuse/core";

export default defineComponent({
  name: "AccountIdInput",
  components: { TextInput },
  props: {
    modelValue: { type: Object as PropType<AccountId | null>, default: null },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: "" },
    error: { type: Boolean, default: false },
  },
  emits: ["valid", "update:modelValue"],
  setup(props, context) {
    const state = reactive({
      accountString: "",
      isValid: null as boolean | null,
      hasError: null as boolean | null,
    });

    // import hashgraph sdk on component mount
    const hashgraph = ref<typeof import("@hashgraph/sdk") | null>(null);
    onMounted(async () => {
      hashgraph.value = await import("@hashgraph/sdk");
    });

    function valid(accountId: AccountId): void {
      state.isValid = true;
      state.hasError = false;
      context.emit("valid", true);
      context.emit("update:modelValue", accountId);
    }

    function invalid(): void {
      state.isValid = false;
      state.hasError = true;
      context.emit("valid", false);
      context.emit("update:modelValue", null);
    }

    // immediately clear valid/error state
    watch(
      () => state.accountString,
      () => {
        state.isValid = null;
        state.hasError = null;
      }
    );

    // validate entered accountId on delay
    debouncedWatch(
      () => state.accountString,
      (newAccountString) => {
        // if disabled, don't validate
        if (!props.disabled) {
          if (hashgraph.value != null) {
            const { AccountId } = hashgraph.value;

            try {
              const accountId = AccountId.fromString(newAccountString);
              if (accountId.num > Long.ZERO) {
                valid(accountId);
              } else {
                invalid();
              }
            } catch (error) {
              invalid();
            }
          }
        }
      },
      { debounce: 250 }
    );

    return {
      state,
    };
  },
});
</script>
