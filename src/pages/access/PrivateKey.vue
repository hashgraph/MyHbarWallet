<template>
  <Layout
    :title="$t('PrivateKey.title')"
    :back="{ name: 'access.software' }"
    class="max-w-lg"
  >
    <div class="mb-2 text-black-out dark:text-white">
      {{ $t("PrivateKey.access.instruction") }}
    </div>

    <div class="mb-4 text-sm text-squant dark:text-white">
      {{ $t("PrivateKey.access.paragraph") }}
    </div>

    <KeyInput
      v-model="privateKeyText"
      data-cy-key-input
      secret
      :error="isBadKey"
    />

    <div
      v-if="isBadKey"
      class="mt-2 text-sm font-medium text-harlocks-cape"
    >
      {{ $t("PrivateKey.access.badKey") }}
    </div>

    <Button
      data-cy-key-submit
      color="green"
      class="w-full p-3 mt-16"
      :data-cy-access-button="access"
      @click.prevent="handleSubmit"
    >
      {{ $t("BaseButton.accessWallet") }}
    </Button>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";

import { PrivateKeySoftwareWallet } from "../../domain/wallet/software-private-key";
import { useStore } from "../../store";
import Layout from "../../components/access/Layout.vue";
import Button from "../../components/base/Button.vue";
import KeyInput from "../../components/base/KeyInput.vue";

export default defineComponent({
  name: "PrivateKey",
  components: {
    Layout,
    Button,
    KeyInput,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const privateKeyText = ref("");
    const isBadKey = ref(false);

    watch(privateKeyText, () => {
      isBadKey.value = false;
    });

    async function handleSubmit() {
      const { PrivateKey } = await import("@hashgraph/sdk");

      isBadKey.value = false;

      let privateKey;

      try {
        privateKey = PrivateKey.fromString(privateKeyText.value);
      } catch (err) {
        isBadKey.value = true;
        return;
      }

      store.setWallet(new PrivateKeySoftwareWallet(privateKey));

      router.push({ name: "access.account" });
    }

    return {
      handleSubmit,
      privateKeyText,
      isBadKey,
    };
  },
});
</script>
