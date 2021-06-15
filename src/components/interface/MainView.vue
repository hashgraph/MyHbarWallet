<template>
  <div class="py-8 px-5 lg:py-10 lg:px-8">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainView",
});
</script>
