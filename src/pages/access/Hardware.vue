<template>
  <Layout title="Hardware" :back="{ name: 'access' }" class="max-w-3xl">
    <div class="grid gap-5 auto-rows-min">
      <OptionCard
        v-for="option in options"
        :key="option.value"
        :data-cy-option="option.value"
        :light-icon="option.image"
        :dark-icon="option.image"
        :to="{ name: option.route }"
        :title="$t(option.title)"
        :desc="$t(option.description)"
        :recommended="option.value === HardwareOption.Ledger"
      />
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HardwareOption, HardwareOptions } from "../../domain/HardwareOptions";
import Layout from "../../components/access/Layout.vue";
import OptionCard from "../../components/base/OptionCard.vue";

export default defineComponent({
  name: "Hardware",
  components: {
    OptionCard,
    Layout,
  },
  setup() {
    const options = Array.from(HardwareOptions.values()).filter(
      (option) => option.supported
    );

    return {
      options,
      HardwareOption,
    };
  },
});
</script>
