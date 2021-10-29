<template>
  <Layout
    :title="$t('Create.title')"
    class="max-w-3xl"
  >
    <div class="grid gap-5 auto-rows-min">
      <template
        v-for="option in options"
        :key="option.value"
      >
        <!-- Software method should explicitly be not recommended -->
        <OptionCard
          :data-cy-option="option.title"
          :light-icon="option.imageLight"
          :dark-icon="option.imageDark"
          :to="{ name: option.route }"
          :title="$t(option.title)"
          :desc="$t(option.description)"
          :recommended="option.value === CreateOptionType.Software ? false : null"
        />
      </template>
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { CreateOptionType, CreateOptions } from "../../domain/CreateOptions";
import Layout from "../../components/access/Layout.vue";
import OptionCard from "../../components/base/OptionCard.vue";

export default defineComponent({
  name: "Create",
  components: {
    Layout,
    OptionCard,
  },
  setup() {
    const options = Array.from(CreateOptions.values()).filter(
      (option) => option.supported
    );

    return {
      options,
      CreateOptionType
    };
  },
});
</script>
