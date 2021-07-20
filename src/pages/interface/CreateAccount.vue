<template>
  <Headline />
  
  <Hint />
  
  <form
    class="flex flex-col"
    @submit.prevent="handleSubmit"
  >
    <KeyInput v-model="state.publicKey" />

    <AssetInput v-model="state.initialBalance" />

    <InputError
      v-if="state.errorMessage.length > 0"
      v-model="state.errorMessage"
    />
    
    <Button
      type="submit"
      @click.stop="handleSubmit"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import type { Hbar } from "@hashgraph/sdk";

import Headline from "../../components/interface/Headline.vue";
import Hint from "../../components/interface/Hint.vue";
import AssetInput from "../../components/interface/AssetInput.vue";
import InputError from "../../components/base/InputError.vue";
import KeyInput from "../../components/base/KeyInput.vue";
import Button from "../../components/base/Button.vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "CreateAccount",
  components: {
    Headline,
    Hint,
    AssetInput,
    InputError,
    KeyInput,
    Button
  },
  setup() {
    const store = useStore();
    const state = reactive({
      errorMessage: "",
      initialBalance: null as Hbar | null,
      publicKey: "",
      busy: false
    });

    async function handleSubmit(): Promise<void> {
      state.errorMessage = "";
      state.busy = true;

      try {
        const { PublicKey } = await import("@hashgraph/sdk");
        const key = PublicKey.fromString(state.publicKey);

        if (key != null && state.initialBalance != null) {
          store.client?.createAccount({
            publicKey: key,
            initialBalance: state.initialBalance.toBigNumber()
          });
        }
      } catch (error) {
        state.errorMessage = await store.errorMessage(error);
      } finally {
        state.busy = false;
      }
    }

    return {
      state,
      handleSubmit
    }
  }
})
</script>