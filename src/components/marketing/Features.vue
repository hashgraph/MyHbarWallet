<template>
  <div
    class="px-5 py-12  md:py-32 bg-gradient-to-b from-first-snow dark:from-midnight-express to-white dark:to-black"
  >
    <div
      class="
                grid
                gap-[80px]
                md:gap-[100px]
                lg:grid-cols-[400px,400px]
                xl:grid-cols-[500px,500px]
                container
                mx-auto
                justify-center
                lg:max-w-[initial]
                max-w-[400px]
            "
    >
      <Feature
        :img="hbar"
        :heading="$t('Marketing.features.section1.header')"
        :bio="$t('Marketing.features.section1.paragraph1')"
      />

      <Feature
        :img="thumbdrive"
        :heading="$t('Marketing.features.section2.header')"
        :bio="$t('Marketing.features.section2.paragraph1')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import hbar from "../../assets/img_hbar.svg";
import thumbdrive from "../../assets/img_hardware-1.svg";

import Feature from "./Feature.vue";

export default defineComponent({
  name: "Features",
  components: { Feature },
  setup() {
    return {
      hbar,
      thumbdrive,
    };
  },
});
</script>
