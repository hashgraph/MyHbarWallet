<template>
  <Button
    :color="associated ? 'green' : 'white'"
    :class="[
      'flex-grow lg:flex-grow-0 py-2',
      {
        'px-3 bg-first-snow border dark:bg-midnight-express border-first-snow dark:border-midnight-express':
          associated,
        'px-6': !associated,
      },
    ]"
    :to="to"
  >
    <div
      v-if="associated"
      class="flex justify-center font-semibold rounded-3xl dark:text-silver-polish"
    >
      <img
        class="w-5 mr-2"
        :src="greenCheck"
      >

      {{ $t("BaseButton.associated") }}
    </div>

    <div v-else>
      {{ $t("BaseButton.associate") }}
    </div>
  </Button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteLocationRaw } from "vue-router";

import Button from "../base/Button.vue";
import greenCheck from "../../assets/icon_check_green.svg";

export default defineComponent({
  name: "TokenAssociateButton",
  components: { Button },
  props: {
    to: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      default: null,
    },
    associated: { type: Boolean, required: true },
  },
  setup() {
    return { greenCheck };
  },
});
</script>
