<template>
  <Headline :title="$t('InterfaceAssets.header')" />
<<<<<<< HEAD
  <InterfaceAssets hide-header class="mt-6 pb-10 w-full" />
=======
  <InterfaceAssets hide-header class="mt-6 pb-10" />
>>>>>>> 0e31c2ba (Fixed merge conflicts, issues with router.)
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InterfaceAssets from "../../components/interface/Assets.vue";
import Headline from "../../components/interface/Headline.vue";

export default defineComponent({
  name: "Assets",
  components: {
    InterfaceAssets,
    Headline,
  },
});
</script>
