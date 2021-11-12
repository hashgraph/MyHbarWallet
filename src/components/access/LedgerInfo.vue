<template>
  <div class="p-4 rounded space-y-2 bg-peach">
    <li>{{ $t("Ledger.Instruction1") }}</li>

    <li class="py-2">
      {{ $t("Ledger.Instruction2") }}
    </li>

    <li>{{ $t("Ledger.Instruction3") }}</li>

    <li>
      {{ $t("Ledger.NoAccount") }} <a
        class="underline"
        href="https://launchbadge.com/blog/using-a-ledger-nano-to-create-your-hedera-account"
      >{{ $t("Ledger.ClickHere") }}</a>
    </li>

    <li>
      {{ $t("Ledger.LoginGuide") }} <a
        class="underline"
        href="https://launchbadge.com/blog/logging-in-with-your-ledger"
      >{{ $t("Ledger.ClickHere") }}</a>
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LedgerInfo",
});
</script>
