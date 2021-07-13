<template>
  <div
    class="flex justify-between p-5 pr-2 text-base font-medium bg-white rounded shadow-md  dark:bg-ruined-smores border-jupiter dark:border-midnight-express"
  >
    <div>
      <div>{{ transfer.to }}</div>

      <div class="text-sm font-light text-carbon dark:text-white">
        (0.0.234)
      </div>
    </div>

    <div class="flex items-center justify-between w-48">
      <div>{{ transfer.asset }}</div>

      <div>{{ transfer.amount }}</div>

      <ActionsButton
        @remove="$emit('remove')"
        @edit="$emit('edit')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Transfer } from "../../pages/interface/Send.vue";

import ActionsButton from "./ActionsButton.vue";

export default defineComponent({
  name: "TransferTile",
  components: { ActionsButton },
  props: {
    transfer: { type: Object as PropType<Transfer>, required: true },
  },
  emits: ["remove", "edit"],
});
</script>
