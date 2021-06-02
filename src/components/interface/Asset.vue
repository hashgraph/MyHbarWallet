<template>
  <div
    class="
      mb-1
      shadow
      rounded
      border border-jupiter
      dark:bg-kuroi-black
      dark:border-kuroi-black
    "
  >
    <div class="flex items-center" :class="{ 'py-5': !!value, 'py-3': !value }">
      <img
        :class="{
          'mx-4 h-11 w-11': !!value,
          'mx-4 h-8 w-11 object-contain': !value,
        }"
        :src="img"
        alt=""
      />
      <div>
        <div class="leading-5 text-black-out dark:text-white font-semibold">
          {{ name }}
        </div>
        <div
          v-if="value"
          class="text-sm text-squant dark:text-argent leading-5 mt-1"
        >
          {{ value }}
        </div>
      </div>

      <div class="ml-auto pr-5">
        <div
          class="text-right text-carbon dark:text-white font-semibold leading-5"
        >
          {{ amount }}
        </div>
        <div
          v-if="total"
          class="text-sm text-right text-squant dark:text-argent leading-5 mt-1"
        >
          {{ total }}
        </div>
      </div>
    </div>
    <BannerError v-if="error" class="m-1" />
    <BannerFrozenAsset v-if="frozen" class="m-1" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BannerError from "./BannerError.vue";
import BannerFrozenAsset from "./BannerError.vue";

export default defineComponent({
  name: "Asset",
  components: {
    BannerError,
    BannerFrozenAsset,
  },
  props: {
    img: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: String, default: null },
    total: { type: String, default: null },
    amount: { type: String, required: true },
    error: { type: Boolean, default: false },
    frozen: { type: Boolean, default: false },
  },
});
</script>
