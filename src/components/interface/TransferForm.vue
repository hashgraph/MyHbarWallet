<template>
  <div class="py-3.5 px-6 min-w-[500px] text-carbon dark:bg-ruined-smores">
    <label class="block dark:text-silver-polish mb-2" for="to">To</label>

    <div class="pb-0.5">
      <TextInput
        id="to"
        :model-value="formattedTo"
        :valid="toIsValid"
        placeholder="shard.realm.num"
        @input="onToInput"
      />
    </div>

    <label class="dark:text-silver-polish block pt-2 mb-2 mt-5"> Asset </label>

    <AssetSelector v-model="dAsset" />

    <label class="dark:text-silver-polish block pt-2 mb-2 mt-5" for="amount">
      Amount
    </label>

    <AssetInput id="amount" v-model="dAmount" :asset="asset" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, ref } from "vue";
import AssetSelector from "./AssetSelector.vue";
import { useVModel } from "@vueuse/core";
import AssetInput from "./AssetInput.vue";
import { AccountId } from "@hashgraph/sdk";
import TextInput from "../base/TextInput.vue";

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
  },
  emits: ["update:to", "update:asset", "update:amount"],
  setup(props, { emit }) {
    const dAsset = useVModel(props, "asset");
    const dAmount = useVModel(props, "amount");
    const toIsValid = ref(false);

    function onToInput(event: Event) {
      const target = (event as HTMLInputElement).target;
      let value = target.value;

      try {
        emit("update:to", AccountId.fromString(value));
        toIsValid.value = true;
      } catch (err) {
        // suppress error
        emit("update:to", null);
        toIsValid.value = false;
      }

      nextTick(() => {
        target.value = value;
      });
    }

    const formattedTo = computed(() => props.to?.toString() ?? "");

    return {
      dAsset,
      onToInput,
      formattedTo,
      toIsValid,
      dAmount,
    };
  },
});
</script>
