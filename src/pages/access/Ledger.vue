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
import { defineComponent, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import Layout from "../../components/access/Layout.vue";
import Button from "../../components/base/Button.vue";
import InputError from "../../components/base/InputError.vue";
import LedgerInfo from "../../components/access/LedgerInfo.vue";
import { LedgerHardwareWallet } from "../../domain/wallet/hardware-ledger";
import { useStore } from "../../store";
import { isWebUsbSupported } from "../../hooks/platform";

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
    // const i18n = useI18n();
    const state = reactive({
      busy: false,
      disabled: false,
      errorMessage: "",
    });

    // onMounted(async () => {
    //   if (!await isWebUsbSupported()) {
    //     state.disabled = true;
    //     state.errorMessage = i18n.t("Ledger.WebUSBNotSupported").toString();
    //   }
    // });

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
