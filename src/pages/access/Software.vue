<template>
  <Layout
    :title="$t('Software.title')"
    :back="{ name: 'access' }"
    class="max-w-3xl"
  >
    <div class="grid gap-5 auto-rows-min">
      <OptionCard
        v-for="option in options"
        :key="option.value"
        :data-cy-option="option.title"
        :light-icon="option.imageLight"
        :dark-icon="option.imageDark"
        :title="$t(option.title)"
        :desc="$t(option.description)"
        @click="onClickOption(option)"
      />
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import {
  SoftwareAttributes,
  SoftwareOption,
  SoftwareOptions,
} from "../../domain/SoftwareOptions";
import OptionCard from "../../components/base/OptionCard.vue";
import Layout from "../../components/access/Layout.vue";

export default defineComponent({
  name: "Software",
  components: {
    OptionCard,
    Layout,
  },
  setup() {
    const router = useRouter();
    const fileInput = ref<HTMLInputElement>();

    const options = Array.from(SoftwareOptions.values()).filter(
      (option) => option.supported
    );

    function onClickOption(option: SoftwareAttributes) {
      router.push({ name: option.route });
    }

    return {
      options,
      SoftwareOption,
      fileInput,
      onClickOption
    };
  },
});
</script>
