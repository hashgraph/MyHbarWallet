<template>
  <div
    class="
      flex
      justify-between
      p-5
      pr-2
      font-medium
      text-base
      bg-white
      dark:bg-ruined-smores
      rounded
      shadow-md
      border-jupiter
      dark:border-midnight-express
    "
  >
    <div>
      <div>{{ transfer.to }}</div>

      <div class="font-light text-sm text-carbon dark:text-white">
        (0.0.234)
      </div>
    </div>

    <div class="w-48 flex items-center justify-between">
      <div>{{ transfer.asset }}</div>

      <div>{{ transfer.amount }}</div>

      <ActionsButton @remove="$emit('remove')" @edit="$emit('edit')" />
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
