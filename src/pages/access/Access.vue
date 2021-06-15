<template>
  <Layout :title="$t('Access.title')" class="max-w-3xl">
    <div class="grid gap-5 auto-rows-min">
      <OptionCard
        v-for="option in options"
        :data-cy-option="option.title"
        :key="option.value"
        :light-icon="option.imageLight"
        :dark-icon="option.imageDark"
        :to="{ name: option.route }"
        :title="$t(option.title)"
        :desc="$t(option.description)"
      />
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { AccessOptionType, AccessOptions } from "../../domain/AccessOptions";
import Layout from "../../components/access/Layout.vue";
import OptionCard from "../../components/base/OptionCard.vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "Access",
  components: {
    OptionCard,
    Layout,
  },
  setup() {
    const store = useStore();

    const options = Array.from(AccessOptions.values()).filter(
      (option) => option.supported
    );

    onMounted(() => {
      store.$reset();
    });

    return {
      options,
      AccessOptionType,
    };
  },
});
</script>
