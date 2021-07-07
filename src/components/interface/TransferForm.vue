<template>
  <div class="py-3.5 px-6 text-carbon dark:bg-ruined-smores">
    <label
      class="block mb-2 dark:text-silver-polish"
      for="to"
    >To</label>

    <div class="pb-0.5">
      <TextInput
        id="to"
        :model-value="formattedTo"
        :valid="toIsValid"
        :placeholder="$t('InterfaceHomeSendModal.input1.placeholder')"
      />
    </div>

    <label class="block pt-2 mt-5 mb-2 dark:text-silver-polish">
      Asset
    </label>

    <AssetSelector v-model="dAsset" />

    <div class="flex flex-wrap items-center">
      <div class="w-5/12 m-auto">
        <label
          class="block pt-2 mt-5 mb-2 dark:text-silver-polish"
          for="amount"
        >
          {{ $t("InterfaceHomeSendModal.input3.label") }}
        </label>

        <!-- TODO: Fix -->
        <AssetInput
          id="amount"
          :asset="asset"
        />
      </div>

      <div class="w-5/12 m-auto">
        <label
          class="block pt-2 mt-5 mb-2 dark:text-silver-polish"
        >USD</label>

        <TextInput
          id="usd"
          :model-value="'$'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { useVModel } from "@vueuse/core";
import { AccountId } from "@hashgraph/sdk";

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
    amount: { type: String, default: null },
    usd: { type: String, default: "USD" },
  },
  emits: ["update:to", "update:asset", "update:amount"],
  setup(props, { emit }) {
    const dAsset = useVModel(props, "asset");
    const dAmount = useVModel(props, "amount");
    const dUSD = useVModel(props, "usd");
    const toIsValid = ref(false);

    function onToInput(event: InputEvent) {
      // TODO: Fix
      // const target = event.target;
      // let value = target?.value;
      console.log(event);

      try {
        // emit("update:to", AccountId.fromString(value));
        toIsValid.value = true;
      } catch (err) {
        // suppress error
        emit("update:to", null);
        toIsValid.value = false;
      }

      // nextTick(() => {
      //   target.value = value;
      // });
    }

    // function usdToHbar(BigNumber: usd): HbarUnit {}

    const formattedTo = computed(() => props.to?.toString() ?? "");

    return {
      dAsset,
      onToInput,
      formattedTo,
      toIsValid,
      dAmount,
      dUSD,
    };
  },
});
</script>
