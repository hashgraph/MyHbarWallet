<template>
  <div
    :class="[
      'flex',
      'max-w-3xl min-h-32',
      'px-14 py-4',
      'bg-egg-sour rounded',
    ]"
  >
    <!-- Caution icon -->
    <img
      :src="alertIcon"
      :class="['w-6 h-6', 'mr-4']"
      alt="alert icon"
    >

    <div :class="['flex flex-col']">
      <!-- 'Not Recommended' title -->
      <span :class="['font-bold']">{{
        $t("BaseOptionCard.notRecommended")
      }}</span>

      <!-- Caution description -->
      <!-- Slot to append caution text (for create) -->
      <span
        :class="['text-sm']"
      >{{ $t("BaseOptionCard.caution") }} <slot />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import alertIcon from "../../assets/icon_alert.svg";

export default defineComponent({
    name: "NotRecommendedBanner",
    setup() {
        return { alertIcon };
    },
});
</script>
