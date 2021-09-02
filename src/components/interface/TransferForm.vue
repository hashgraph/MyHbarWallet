<template>
  <div class="py-3.5 px-6 text-carbon dark:bg-ruined-smores">
    <label
      class="block mb-2 dark:text-silver-polish"
      for="to"
    >
      To
    </label>

    <div class="pb-0.5">
      <TextInput
        id="to"
        v-model="state.rawTo"
        data-cy-transfer-to
        :valid="state.toValid"
        :placeholder="$t('InterfaceHomeSendModal.input1.placeholder')"
        @update:modelValue="handleToInput"
      />
    </div>

    <label class="block pt-2 mt-5 mb-2 dark:text-silver-polish">
      {{ $t('InterfaceAsset.asset') }}
    </label>

    <AssetSelector
      v-model="dAsset"
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
      v-model="dAmount"
      data-cy-asset-amount
      :asset="asset"
    />
  </div>
</template>

<script lang="ts">
import { BigNumber } from "bignumber.js";
import { defineComponent, PropType, reactive } from "vue";
import { useVModel } from "@vueuse/core";
import type { AccountId } from "@hashgraph/sdk";

import TextInput from "../base/TextInput.vue";

import AssetInput from "./AssetInput.vue";
import AssetSelector from "./AssetSelector.vue";

export default defineComponent({
  name: "TransferForm",
  components: {
    TextInput,
    AssetInput,
    AssetSelector,
  },
  props: {
    to: { type: Object as PropType<AccountId>, default: null },
    asset: { type: String, default: "HBAR" },
    amount: { type: Object as PropType<BigNumber.Instance>, default: null },
  },
  emits: ["update:to", "update:asset", "update:amount", "update:usd"],
  setup(props, { emit }) {
    const dAsset = useVModel(props, "asset");
    const dAmount = useVModel(props, "amount");
    
    const state = reactive({
      toValid: false,
      rawTo: ""
    })

    async function handleToInput(newTo: string): Promise<void> {
      try {
        const { AccountId } = await import("@hashgraph/sdk");
        const account = AccountId.fromString(newTo);
        state.toValid = true;
        emit("update:to", account);
      } catch (error) {
        state.toValid = false;
      }
    }
    
    return {
      dAsset,
      dAmount,
      state,
      handleToInput
    };
  },
});
</script>
