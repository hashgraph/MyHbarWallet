<template>
  <Layout
    :title="$t('PrivateKey.title')"
    class="max-w-lg"
    :back="{ name: 'create.software' }"
  >
    <form
      class="grid gap-5 auto-rows-min"
      @submit.prevent="handleSubmit"
    >
      <div class="flex flex-col">
        <KeyInput
          :model-value="key?.toString().slice(32) ?? ''"
          disabled
          canCopy
        />

        <Button
          color="green"
          class="w-full p-4 mt-14"
        >
          {{ $t("BaseButton.continue") }}
        </Button>

        <InputError v-if="errorMessage.length > 0">
          {{ errorMessage }}
        </InputError>

        <div class="mt-10 text-sm text-black-out dark:text-white">
          <span class="font-semibold text-Megaman-Helmet">
            {{ $t("PrivateKey.note.dnf") }}
          </span>

          {{ $t("PrivateKey.note") }}
        </div>
      </div>
    </form>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import type { PrivateKey } from "@hashgraph/sdk";
import { useRouter } from "vue-router";

import Layout from "../../components/access/Layout.vue";
import Button from "../../components/base/Button.vue";
import KeyInput from "../../components/base/KeyInput.vue";
import { PrivateKeySoftwareWallet } from "../../domain/wallet/software-private-key";
import { useStore } from "../../store";

export default defineComponent({
  name: "CreatePrivateKey",
  components: {
    Button,
    KeyInput,
    Layout,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const errorMessage = ref("");
    const key = ref<PrivateKey | null>(null);

    onMounted(async () => {
      const { PrivateKey } = await import("@hashgraph/sdk");
      key.value = PrivateKey.generate();
    });

    async function handleSubmit(): Promise<void> {
      try {
        if (key.value != null) {
          const wallet = new PrivateKeySoftwareWallet(key.value as PrivateKey);
          store.setWallet(wallet);
          router.push({ name: "access.account" });
        }
      } catch (error) {
        errorMessage.value = await store.errorMessage(error);
      }
    }

    return {
      errorMessage,
      key,
      handleSubmit
    };
  },
});
</script>
