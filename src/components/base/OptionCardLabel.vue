<template>
  <!-- Note: Bypassing '!= null' implies 'recommended' is for sure a Boolean -->
  <div
    v-if="recommended != null"
    :class="[
      'absolute top-2.5 right-2.5',
      'flex items-center',
      'text-xxs font-semibold',
      'px-2 py-1.5',
      'rounded',
      {
        'text-white bg-bright-navy-blue': recommended,
        'text-caution-yellow border-caution-yellow border-1':
          !recommended,
      },
    ]"
  >
    <!-- Caution icon if 'not recommended' -->
    <img
      v-if="!recommended"
      :src="alertIcon"
      class="w-4 mr-1"
      alt="alert icon"
    >

    <!-- Label text -->
    <span>{{
      recommended
        ? $t("BaseOptionCard.recommended")
        : $t("BaseOptionCard.notRecommended")
    }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import alertIcon from "../../assets/icon_alert.svg";

export default defineComponent({
    name: "OptionCardLabel",
    props: {
        // true: recommended, false: explicitly not recommended, null: no recommendation/empty
        recommended: {
            type: Boolean,
            default: null,
        },
    },
    setup() {
        return {
            alertIcon,
        };
    },
});
</script>
