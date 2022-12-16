<template>
  <div
    class="shadow-md rounded py-4 px-6 text-carbon bg-white dark:bg-ruined-smores"
  >
    <label
      class="block mb-2 dark:text-silver-polish"
      for="to"
    >
      To
    </label>

    <div class="pb-0.5">
      <TextInput
        id="to"
        v-model="rawTo"
        data-cy-transfer-to
        :valid="toValid"
        :placeholder="$t('InterfaceHomeSendModal.input1.placeholder')"
        @update:model-value="handleToUpdate"
      />
    </div>

    <label class="block pt-2 mt-5 mb-2 dark:text-silver-polish">
      {{ $t('InterfaceAsset.asset') }}
    </label>

    <AssetSelector
      v-model="assetValue"
      data-cy-asset-selector
    />

    <label
      class="block pt-2 mt-5 mb-2 dark:text-silver-polish"
      for="amount"
    >
      {{ $t("InterfaceHomeSendModal.input3.label") }}
    </label>

    <AssetInput
      id="amount"
      v-model="amountValue"
      data-cy-asset-amount
      :asset="asset"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { useVModel } from "@vueuse/core";
import type { AccountId } from "@hashgraph/sdk";
import { BigNumber } from "bignumber.js";

import TextInput from "../base/TextInput.vue";
import AssetInput from "../base/AssetInput.vue";

import AssetSelector from "./AssetSelector.vue";

export default defineComponent({
  name: "TransferForm",
  components: {
    TextInput,
    AssetInput,
    AssetSelector,
  },
  props: {
    to: { type: Object as PropType<AccountId | null>, default: null },
    asset: { type: String, default: "HBAR" },
    amount: { type: Object as PropType<BigNumber>, default: null },
  },
  emits: ["update:to", "update:asset", "update:amount"],
  setup(props, { emit }) {
    const rawTo = ref("");
    const toValid = ref(true);
    const assetValue = useVModel(props, "asset", emit);
    const amountValue = useVModel(props, "amount", emit);
    

    async function handleToUpdate(newTo: string): Promise<void> {
      try {
        const { AccountId } = await import("@hashgraph/sdk");
        const account = AccountId.fromString(newTo);
        toValid.value = true;
        emit("update:to", account);
      } catch (error) {
        toValid.value = false;
      }
    }

    return {
      rawTo,
      toValid,
      handleToUpdate,
      assetValue,
      amountValue
    };
  },
});
</script>
