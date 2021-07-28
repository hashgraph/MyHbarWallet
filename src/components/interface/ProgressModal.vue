<template>
  <div
    class="fixed inset-0 z-20 overflow-y-auto transition-all duration-300"
    :class="[
      {
        'opacity-100': isVisible,
      },
      { 'opacity-0 invisible': !isVisible },
    ]"
  >
    <div
      class="flex flex-col items-center justify-center min-h-screen h-full bg-cerebral-grey dark:bg-ruined-smores bg-opacity-70 p-8"
      @click="$emit('close')"
    >
      <div
        class="w-full max-w-lg px-6 py-5 font-medium transition-all duration-300 bg-white border border-white rounded shadow-xl dark:bg-ruined-smores text-carbon dark:text-silver-polish dark:border-midnight-express"
        :class="[
          {
            'transform sm:translate-y-0 translate-y-1/3 1opacity-100 ': isVisible,
          },
          {
            'transform translate-y-16 opacity-0 invisible':
              !isVisible,
          },
        ]"
        @click.stop
      >
        <div class="flex justify-between">
          <div class="text-xl font-medium mb-4">
            {{ title }}
          </div>
        </div>
        <div class="text-center items-center justify-center p-4">
          <Image
            :light="IP"
            :dark="IP"
            class="animate-spin-slow h-28 m-auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script lang = "ts">import { setMapStoreSuffix } from "pinia";
import { defineComponent } from "vue";

import Image from "../base/Image.vue";
import IP from "../../assets/IP_green-to-purple.svg";

export default defineComponent({
    name: "ProgressModal",
    components: {
        Image
    },
    props: {
        isVisible: { type: Boolean, required: false },
        title: { type: String, required: true },
    },

    emits: ["close"],
    setup() {
        return { IP };
    },
});


</script>