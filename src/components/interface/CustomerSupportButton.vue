//this component is a wrapper for the customer support button
<template>
    <div>
        <Button
          class="hover:opacity-50 hover:no-underline"
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
import CustomerSupportModal from './CustomerSupportModal.vue';

export default defineComponent({
    name: "CustomerSupportButton",
    components: {
      Button,
      CustomerSupportModal
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

