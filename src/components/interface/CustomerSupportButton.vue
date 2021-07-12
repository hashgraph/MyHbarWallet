<template>
  <div>
    <Button
      color="green"
      class="px-5 py-2"
      @click="handleButtonClick"
    >
      {{ $t("CustomerSupport.button") }}
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useStore } from "../../store";
import Button from '../base/Button.vue';

export default defineComponent({
    name: "CustomerSupportButton",
    components: {
      Button,
    },
    setup() {
        const store = useStore();

        function handleButtonClick(): void {
          store.setContactSupportOpen(true);
        }

        return {
            handleButtonClick
        };
    },
});
</script>

