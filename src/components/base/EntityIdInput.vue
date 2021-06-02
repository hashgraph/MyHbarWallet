<template>
  <TextInput
    v-model="state.inputString"
    :valid="state.isValid"
    :error="state.hasError"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  watch,
  PropType,
} from "vue";
import { debouncedWatch } from "@vueuse/core";
import Long from "long";
import type { AccountId, TokenId, FileId } from "@hashgraph/sdk";
import TextInput from "./TextInput.vue";

export enum EntityType {
  Account = "account",
  Token = "token",
  File = "file"
}

export default defineComponent({
  name: "HbarInput",
  components: { TextInput },
  props: {
    modelValue: {
      type: Object as PropType<AccountId | TokenId | null>,
      default: null,
    },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: "" },
    type: { type: String, default: "", required: true },
  },
  emits: ["valid", "update:modelValue"],
  setup(props, context) {
    const state = reactive({
      inputString: "",
      isValid: null as boolean | null,
      hasError: null as boolean | null,
    });

    // import hashgraph sdk on component mount
    const hashgraph = ref<typeof import("@hashgraph/sdk") | null>(null);
    onMounted(async () => {
      hashgraph.value = await import("@hashgraph/sdk");
    });

    function valid(entity: AccountId | TokenId): void {
      state.isValid = true;
      state.hasError = false;
      context.emit("valid", true);
      context.emit("update:modelValue", entity);
    }

    function invalid(): void {
      state.isValid = false;
      state.hasError = true;
      context.emit("valid", false);
      context.emit("update:modelValue", null);
    }

    // immediately clear valid/error state
    watch(
      () => state.inputString,
      () => {
        state.isValid = null;
        state.hasError = null;
      }
    );

    function validate(id: AccountId | TokenId | FileId): void {
      if (id.num.greaterThan(Long.ZERO)) {
        valid(id);
      } else {
        invalid();
      }
    }

    function validateAccount(account: string): void {
      if (hashgraph.value != null) {
        const { AccountId } = hashgraph.value;
        const accountId = AccountId.fromString(account);
        validate(accountId);
      } else {
        invalid();
      }
    }

    function validateToken(token: string): void {
      if (hashgraph.value != null) {
        const { TokenId } = hashgraph.value;
        const tokenId = TokenId.fromString(token);
        validate(tokenId);
      } else {
        invalid();
      }
    }


    function validateFile(file: string): void {
      if(hashgraph.value != null){
        const { FileId } = hashgraph.value;
        const fileId = FileId.fromString(file);
        validate(fileId);
      } else {
        invalid();
      }
    }

    // validate entered Entity String on delay
    debouncedWatch(
      () => state.inputString,
      (newInputString) => {
        // if disabled, don't validate
        if (!props.disabled) {
          try {
            switch (props.type) {
              case EntityType.File:
                validateFile(newInputString);
                break;
              case EntityType.Account:
                validateAccount(newInputString);
                break;
              case EntityType.Token:
                validateToken(newInputString);
                break;
              default:
                invalid();
                break;
            }
          } catch (error) {
            invalid();
          }
        }
      },
      { debounce: 500 }
    );

    return { state, EntityType };
  },
});
</script>
