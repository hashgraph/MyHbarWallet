<template>
  <div class="p-4 rounded bg-peach">
    <li>{{ $t("Ledger.Instruction1") }}</li>

    <li class="py-2">
      {{ $t("Ledger.Instruction2") }}
    </li>

    <li>{{ $t("Ledger.Instruction3") }}</li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LedgerInfo",
});
</script>
