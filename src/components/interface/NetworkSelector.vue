<template>
  <Select
    :model-value="selectedNetwork"
    data-cy-network-selector
    :options="networks"
    :full-width="fullWidth"
    class="h-12 my-auto"
    :capitalize="true"
    @update:model-value="onUpdateValue"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n";

import hedera from "../../assets/icon_hedera.svg";
import hederaDark from "../../assets/dark/icon_hedera_dark.svg";
import Select from "../base/Select.vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "NetworkSelector",
  components: { Select },
  props: {
    fullWidth: { type: Boolean, default: false },
  },
  setup() {
    const i18n = useI18n();
    const store = useStore();

    // TODO: This will come from the store
    const networks = [
      {
        name: i18n.t("Network.mainnet"),
        iconLight: hedera,
        iconDark: hederaDark,
      },
      {
        name: i18n.t("Network.testnet"),
        iconLight: hedera,
        iconDark: hederaDark,
      },
      {
        name: i18n.t("Network.preview"),
        iconLight: hedera,
        iconDark: hederaDark,
      },
    ];

    let selectedNetwork = computed(() => store.network);

    function onUpdateValue(value: "mainnet" | "testnet" | "previewnet") {
      store.setNetwork(value);
    }





    return {
      selectedNetwork,
      networks,
      onUpdateValue,
    };
  },
});
</script>
