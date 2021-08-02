<template>
  <Layout
    :title="$t('KeystoreFile.title')"
    class="max-w-lg"
    :back="{ name: 'access.software' }"
  >
    <div class="grid gap-5 auto-rows-min">
      <div class="leading-5 text-black-out dark:text-white">
        {{ $t("BaseFileUploader.header") }}
      </div>

      <FileUploader
        @name="onUpdateName"
        @file="onUpdateFile"
      />

      <div>
        <PasswordInput
          v-model="password"
          placeholder="Please enter your password"
          show-eye
          :error="errorMessage.length > 0"
        />

        <InputError v-if="errorMessage.length > 0">
          {{ errorMessage }}
        </InputError>
      </div>

      <Button
        data-cy-keystore-submit
        color="green"
        class="w-full p-4 mt-14"
        :disabled="!ready"
        @click="handleSubmit"
      >
        {{ $t("BaseButton.accessWallet") }}
      </Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";

import FileUploader from "../../components/base/FileUploader.vue";
import PasswordInput from "../../components/base/PasswordInput.vue";
import InputError from "../../components/base/InputError.vue";
import Button from "../../components/base/Button.vue";
import Layout from "../../components/access/Layout.vue";
import { useStore } from "../../store";
import { KeystoreSoftwareWallet } from "../../domain/wallet/software-keystore";

export default defineComponent({
  name: "Keystore",
  components: {
    PasswordInput,
    InputError,
    Button,
    FileUploader,
    Layout,
  },
  setup() {
    const password = ref("");
    const errorMessage = ref("");
    const store = useStore();
    const router = useRouter();

    const fileData = ref<Uint8Array | null>(null);
    const fileName = ref<string | null>(null);

    function onUpdateName(name: string): void {
      fileName.value = name;
    }
    
    function onUpdateFile(bytes: Uint8Array): void {
      fileData.value = bytes;
    }

    const ready = computed(() => {
      return fileData.value != null && password.value.length > 0;
    });

    async function handleSubmit() {
      if (fileData.value == null) return;

      errorMessage.value = "";

      try {
        const wallet = new KeystoreSoftwareWallet(
          fileData.value,
          password.value
        );

        // note: trying to get the private key will trigger any
        //       errors about wrong passwords, etc.
        await wallet.getPrivateKey();

        store.setWallet(wallet);

        await router.push({ name: "access.account" });
      } catch (error) {
        errorMessage.value = await store.errorMessage(error);
      }
    }

    return {
      initialFileName: fileName,
      password,
      ready,
      errorMessage,
      handleSubmit,
      onUpdateName,
      onUpdateFile,
    };
  },
});
</script>
