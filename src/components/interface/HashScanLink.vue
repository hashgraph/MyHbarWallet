<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import type { AccountId } from "@hashgraph/sdk";

import { useStore } from '../../store';
import hashscanLogo from "../../assets/hashscan-logo.png";

const accountId = ref<AccountId | null>(null);
const network = ref<string | null>(null);

onMounted(async () => {
  const store = useStore();
  accountId.value = store.accountId;
  network.value = store.network;
});

const hashscanLink = computed(() => {
  return `https://hashscan.io/${network.value}/account/${accountId.value?.toString()}`;
});
</script>

<template>
  <a
    :href="hashscanLink"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      :src="hashscanLogo"
      class="max-h-30 max-w-40"
    >
  </a>
</template>