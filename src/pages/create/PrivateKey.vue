<template>
  <Layout
    title="Private Key"
    class="max-w-lg"
    :back="{ name: 'create' }"
  >
    <div class="grid auto-rows-min gap-5">
      <div class="flex flex-col">
        <KeyInput
          v-model="key"
          disabled
          can-copy
        />

        <Button
          color="green"
          class="mt-14 w-full p-4"
        >
          {{ $t("BaseButton.continue") }}
        </Button>

        <div class="mt-10 text-black-out dark:text-white text-sm">
          <span class="text-Megaman-Helmet font-semibold">
            {{ $t("PrivateKey.note.dnf") }}
          </span>

          {{ $t("PrivateKey.note") }}
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import Layout from "../../components/access/Layout.vue";
import Button from "../../components/base/Button.vue";
import KeyInput from "../../components/base/KeyInput.vue";

export default defineComponent({
  name: "CreatePrivateKey",
  components: {
    Button,
    KeyInput,
    Layout,
  },
  setup() {
    const key = ref(
      "91c45b125adf02b0200d554e6a82a19a80bca2d49e03148de90fffa61ffa600f"
    );

    return {
      key,
    };
  },
});
</script>
