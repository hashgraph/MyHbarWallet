<template>
  <Layout
    title="Verify Mnemonic Phrase"
    class="max-w-3xl"
    :back="{ name: 'create.mnemonic' }"
  >
    <div class="grid auto-rows-min gap-5">
      <MnemonicInput
        v-model="mnemonicPhrase"
        :word-count="24"
      />

      <PasswordInput
        v-model="password"
        label="Password"
        placeholder="Please enter password"
        @valid="handleValid"
        @error="handleError"
      />

      <Button
        color="green"
        class="mt-14 w-full p-4"
        @click="handleSubmit"
      >
        Verify
      </Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import Layout from "../../components/access/Layout.vue";
import Button from "../../components/base/Button.vue";
import PasswordInput from "../../components/base/PasswordInput.vue";
import MnemonicInput from "../../components/base/MnemonicInput.vue";

export default defineComponent({
  name: "MnemonicVerify",
  components: {
    Button,
    MnemonicInput,
    Layout,
    PasswordInput,
  },
  setup() {
    const password = ref("");
    const mnemonicPhrase = ref<string[]>([]);

    function handleValid(valid: boolean): void {
      console.log(`Password Valid: ${valid}`);
    }

    function handleError(error: boolean): void {
      console.log(`Password Error: ${error}`);
    }

    function handleSubmit() {
      console.log(password.value);
      console.log(mnemonicPhrase.value);
    }

    return {
      password,
      mnemonicPhrase,
      handleSubmit,
      handleValid,
      handleError,
    };
  },
});
</script>
