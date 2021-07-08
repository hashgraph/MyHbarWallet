<template>
  <Layout :title="$t('Create.title')" class="max-w-3xl">
    <div class="grid gap-5 auto-rows-min">
      <template v-for="option in options" :key="option.value">
        <!-- TODO: re-enable private key creates eventually -->
        <OptionCard
          v-if="option.value !== 'PrivateKey'"
          :data-cy-option="option.title"
          :light-icon="option.imageLight"
          :dark-icon="option.imageDark"
          :to="{ name: option.route.replace('access.software', 'create') }"
          :title="$t(option.title)"
          :desc="$t(option.description)"
          :recommended="option.value === SoftwareOption.Keystore"
        />
      </template>
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { SoftwareOption, SoftwareOptions } from "../../domain/SoftwareOptions";
import Layout from "../../components/access/Layout.vue";
import OptionCard from "../../components/base/OptionCard.vue";
import { useStore } from "../../store";


export default defineComponent({
  name: "Create",
  components: {
    Layout,
    OptionCard,
  },
  setup() {
    const store = useStore();

    const options = Array.from(SoftwareOptions.values()).filter(
      (option) => option.supported
    );

    onMounted(() => {
      store.$reset();
    });


    return {
      options,
      SoftwareOption,
    };
  },
});
</script>
