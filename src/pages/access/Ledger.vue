<template>
  <Layout
    :title="$t('Ledger.title')"
    class="max-w-lg"
    :back="{ name: 'access.hardware' }"
  >
    <LedgerInfo class="mb-10" />

    <Button
      class="p-4 mb-10"
      :busy="state.busy"
      :disabled="state.disabled"
      color="green"
      @click.prevent="handleConnect"
    >
      {{ $t("Ledger.Continue") }}
    </Button>

    <InputError v-if="state.errorMessage.length > 0">
      {{ state.errorMessage }}
    </InputError>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

import Layout from "../../components/access/Layout.vue";
import Button from "../../components/base/Button.vue";
import InputError from "../../components/base/InputError.vue";
import LedgerInfo from "../../components/access/LedgerInfo.vue";
import { LedgerHardwareWallet } from "../../domain/wallet/hardware-ledger";
import { useStore } from "../../store";

export default defineComponent({
  name: "Ledger",
  components: {
    Layout,
    Button,
    InputError,
    LedgerInfo,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      busy: false,
      disabled: false,
      errorMessage: "",
    });

    async function handleConnect(): Promise<void> {
      state.disabled = true;
      state.busy = true;
      state.errorMessage = "";

      try {
        const wallet = new LedgerHardwareWallet();
        store.setWallet(wallet);
      } catch (error) {
          state.errorMessage = await store.errorMessage(error);
      }

      state.busy = false;
      state.disabled = false;
      router.push({ name: "access.account" });
    }

    return {
      state,
      handleConnect,
    };
  },
});
</script>
