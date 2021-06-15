<template>
  <router-link
    :to="{ name: 'transaction' }"
    class="
      h-20
      mb-1
      flex
      justify-between
      items-center
      border-b border-jupiter
      dark:border-midnight-express
    "
  >
    <Identicon class="h-10 w-10 mr-2" />

    <div class="flex flex-col flex-grow">
      <div class="flex flex-grow justify-between">
        <div class="flex-shrink-0 leading-5 text-andrea-blue font-medium mb-1">
          {{ title }}
        </div>

        <div
          class="
            text-mountain-meadow
            font-medium
            leading-5
            text-right
            max-h-5
            truncate
            mb-1
          "
        >
          {{ truncatedTransaction }}
        </div>
      </div>

      <div class="flex justify-between">
        <div class="text-xs leading-4 text-squant dark:text-argent font-medium">
          {{ `${account} • ${timeAgo}` }}
        </div>
        <div
          class="
            text-xs text-squant
            dark:text-argent
            leading-4
            font-medium
            flex
            justify-end
          "
        >
          {{ `${$t("RecentTransactions.fee")} ${fee}` }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { useScreen } from "../../hooks/screen";
import { computed, defineComponent } from "vue";
import Identicon from "./Identicon.vue";

export default defineComponent({
  name: "Transaction",
  components: { Identicon },
  props: {
    title: { type: String, required: true },
    account: { type: String, required: true },
    timeAgo: { type: String, required: true },
    transaction: { type: String, required: true },
    fee: { type: String, required: true },
  },
  setup(props) {
    const md = useScreen("md");

    const truncatedTransaction = computed(() => {
      const firstComma = props.transaction.indexOf(",");
      if (firstComma != -1) {
        if (md.value) {
          const secondComma = props.transaction.indexOf(",", firstComma + 1);
          return secondComma === -1
            ? props.transaction
            : `${props.transaction.substring(0, secondComma)}, ...`;
        } else {
          const truncated = props.transaction.substring(0, firstComma);
          return `${truncated}, ...`;
        }
      }

      return props.transaction;
    });

    return { truncatedTransaction };
  },
});
</script>
